import FavorietButton from "components/FavorietButton";
import ItemOffcanvas from "components/ItemOffcanvas";
import VeilingCard from "components/VeilingCard";
import React, { useState, useEffect } from "react";
import {
	Button,
	Card,
	Carousel,
	Col,
	Container,
	Form,
	InputGroup,
	Row,
} from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

export default function Item() {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [user, setUser] = useState(null);
	const location = useLocation();

	useEffect(() => {
		async function getAccount() {
			try {
				const response = await fetch(
					`http://localhost:8082/account/${location.state?.id}`
				);
				if (response.ok) {
					const data = await response.json();
					setUser(data);
				} else {
					// Handle error cases here
					console.error("Failed to fetch user data");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}
		if (location.state?.id) {
			getAccount();
		}
	}, [location.state]);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`http://localhost:8082/veilingstuk/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setItem(data);
				console.log(item);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			}
		};
		fetchItem();
		console.log(item);
	}, [id]);

	return (
		<Container className="mt-4">
			<Row>
				<Col lg={8}>
					{item ? (
						<Card>
							{item.fotos.length > 0 && (
								<Carousel>
									{item.fotos.map((img, index) => (
										<Carousel.Item>
											<Card.Img
												variant="top"
												src={img.url}
												alt={img.altText}
												key={index}
											/>
											<Carousel.Caption>
												<small>
													Image {index + 1}: {img.altText}
												</small>
											</Carousel.Caption>
										</Carousel.Item>
									))}
								</Carousel>
							)}

							<Card.Body>
								<Row className="justify-content-between">
									<Col xs={9}>
										<Card.Title>{item.naam}</Card.Title>
										<Card.Subtitle className="mb-2 text-muted">
											{item.categorie}
										</Card.Subtitle>
									</Col>
									<Col xs={3} className="text-end">
										{user != null &&
											(user.id == item.aanbieder_id ? (
												<ItemOffcanvas item={item} />
											) : (
												<FavorietButton
													accountID={user.id}
													itemID={item.id}
													isFav={
														user &&
														user.favorieten &&
														Array.isArray(user.favorieten) &&
														user.favorieten.some(
															(favItem) => favItem.id === item.id
														)
													}
												/>
											))}
									</Col>
								</Row>
								<p>{item.beschrijving}</p>
								<p>Gewicht: {item.gewicht} g</p>
								<p>Hoogte: {item.hoogte} cm</p>
								<p>Lengte: {item.lengte} cm</p>
								<p>Breedte: {item.breedte} cm</p>
								{/* <p>Productie datum: {item.productieDatum}</p> */}
								<p>
									Productie datum:{" "}
									{new Date(item.productieDatum).toLocaleDateString()}
								</p>
								<p>Aangeboden door: {item.aanbieder_naam}</p>
							</Card.Body>
						</Card>
					) : (
						<p>Loading...</p>
					)}
				</Col>
				<Col lg={4}>
					<div className="mt-3 mt-lg-0">
						<h3>Veilingen</h3>
						{item && item.veilingen && item.veilingen.length > 0 ? (
							item.veilingen.map((veiling, index) => (
								<VeilingCard veiling={veiling} index={index} />
							))
						) : (
							<p>Geen veilingen beschikbaar voor dit item.</p>
						)}
					</div>
				</Col>
			</Row>
		</Container>
	);
}
