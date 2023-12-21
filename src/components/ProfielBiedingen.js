import React, { useState } from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfielBiedingen({ user }) {
	const [biedingen, setBiedingen] = useState(user.biedingen);
	const navigate = useNavigate();
	const location = useLocation();

	async function getBiedingen() {
		try {
			const response = await fetch(`http://localhost:8082/account/${user.id}`);
			if (response.ok) {
				const data = await response.json();
				setBiedingen(data.biedingen);
			} else {
				// Handle error cases here
				console.error("Failed to fetch user data");
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}
	console.log(biedingen);

	return (
		<Container className="mt-4">
			<Row className="justify-content-between mb-2">
				<Col xs={9}>
					<h2>U hebt {biedingen.length} biedingen.</h2>
				</Col>
			</Row>
			{biedingen &&
				biedingen.map((bod, index) => {
					return (
						<Card key={index} className="mb-2">
							<Card.Body
								onClick={() => {
									navigate(`/veilingstuk/${bod.veilingstuk_id}`);
									if (user) {
										location.state.id = user.id;
									}
								}}
								style={{ cursor: "pointer" }}
							>
								<Card.Title>
									U hebt een bod van €{bod.prijsInEuro} geplaatst op{" "}
									{bod.veilingstuk_naam}
								</Card.Title>
							</Card.Body>
						</Card>
					);
				})}
		</Container>
	);
}
