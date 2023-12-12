import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Item() {
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const [aanbieder, setAanbieder] = useState(null);

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
							<Card.Body>
								<h1>{item.naam}</h1>
								<h2>{item.categorie}</h2>
								<p>{item.beschrijving}</p>
								<p>Gewicht: {item.gewicht}g</p>
								<p>Hoogte: {item.hoogte} cm</p>
								<p>Lengte: {item.lengte} cm</p>
								<p>Breedte: {item.breedte} cm</p>
								<p>Productie datum: {item.productieDatum}</p>
							</Card.Body>
						</Card>
					) : (
						<p>Loading...</p>
					)}
				</Col>
			</Row>
		</Container>
	);
}
