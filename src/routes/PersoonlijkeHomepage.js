import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function PersoonlijkeHomepage() {
	const location = useLocation();
	const [user, setUser] = useState({ favorieten: [], naam: "", id: 0 });
	const [items, setItems] = useState([]);

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
		async function getItems() {
			try {
				const response = await fetch(`http://localhost:8082/veilingstukken`);
				if (response.ok) {
					const data = await response.json();
					setItems(data);
				} else {
					// Handle error cases here
					console.error("Failed to fetch items");
				}
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		}

		getItems();
	});

	async function favorietToevoegen(itemID) {
		try {
			const response = await fetch(
				`http://localhost:8082/account/${user.id}/veilingstuk/${itemID}`
			);
			if (response.ok) {
				// Fetch was successful, update user's favorites in the UI
				const updatedUser = { ...user };
				if (!updatedUser.favorieten) {
					updatedUser.favorieten = [];
				}
				updatedUser.favorieten.push({ id: itemID }); // Assuming the response doesn't contain the updated favorites directly

				// Update the user state to reflect the changes
				setUser(updatedUser);
			} else {
				// Handle error cases here
				console.error("Failed to add to favorites");
			}
		} catch (error) {
			console.error("Error adding to favorites:", error);
		}
	}

	return (
		<Container fluid className="mt-2">
			<h1 className="text-center">Welkom, {user.naam}</h1>
			<Row id="item-container">
				{items &&
					items.map((item) => {
						const isFavorite =
							user &&
							user.favorieten &&
							Array.isArray(user.favorieten) &&
							user.favorieten.some((favItem) => favItem.id === item.id);

						return (
							<Col key={item.id} xs={12} md={6} xl={3}>
								<Card className="m-2">
									<Card.Body>
										<Row className="justify-content-between">
											<Col xs={9}>
												<Card.Title>{item.naam}</Card.Title>
												<Card.Subtitle className="mb-2 text-muted">
													{item.categorie}
												</Card.Subtitle>
											</Col>
											<Col className="text-end">
												<Button
													variant={isFavorite ? "success" : "danger"}
													className="ml-auto"
													onClick={() => favorietToevoegen(item.id)}
												>
													♡
												</Button>
											</Col>
										</Row>
										<Card.Text>{item.beschrijving}</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
			</Row>
		</Container>
	);
}
