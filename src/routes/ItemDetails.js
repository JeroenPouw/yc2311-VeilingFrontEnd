import FavorietButton from "components/FavorietButton";
import ItemOffcanvas from "components/ItemOffcanvas";
import VeilingCard from "components/VeilingCard";
import { backendURL } from "js/Backend";
import React, { useState, useEffect } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

export default function ItemDetails() {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [token, setToken] = useState(localStorage.getItem("userToken"));
	const [user, setUser] = useState({ favorieten: [], naam: "", id: 0 });

	useEffect(() => {
		async function fetchUser() {
			try {
				if (token) {
					const response = await fetch(`${backendURL}/details`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (!response.ok) {
						console.error("Failed to fetch user data");
						setUser(null);
					}
					const userDetails = await response.json();
					setUser(userDetails);
				} else {
					console.log("No token in storage");
					setUser(null);
				}
			} catch (error) {
				console.error("Error fetching user details:", error);
				setUser(null);
			}
		}
		if (token) {
			fetchUser();
		}
	}, [token]);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const response = await fetch(`${backendURL}/veilingstuk/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setItem(data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			}
		};
		fetchItem();
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
										<Carousel.Item key={index}>
											<Card.Img variant="top" src={img.url} alt={img.altText} />
											<Carousel.Caption>
												<small>
													Foto {index + 1}: {img.altText}
												</small>
											</Carousel.Caption>
										</Carousel.Item>
									))}
								</Carousel>
							)}

							<Card.Body>
								<Row className="justify-content-between">
									<Col xs={9}>
										<Card.Title>
											<h3>{item.naam}</h3>
										</Card.Title>
										<Card.Subtitle className="mb-2 text-muted">
											<h5>{item.categorie}</h5>
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
								<VeilingCard
									veilingID={veiling.id}
									veilingProp={veiling}
									index={index}
									key={index}
									userID={user.id}
								/>
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
