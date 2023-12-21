import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function BodCards({ veiling }) {
	const [biedingen, setBiedingen] = useState(veiling.biedingen);
	const [updatedVeiling, setUpdatedVeiling] = useState(veiling);
	const navigate = useNavigate();
	const location = useLocation();

	const fetchVeiling = async () => {
		try {
			const response = await fetch(
				`http://localhost:8082/veiling/${veiling.id}`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const fetchedVeiling = await response.json();
			// Update the veiling information
			setUpdatedVeiling(fetchedVeiling);
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
		}
	};

	return (
		<Container className="mt-4">
			{biedingen &&
				biedingen.map((bod, index) => {
					return (
						<Card key={index} className="mb-2">
							<Card.Body>
								<Card.Title>
									<b>{bod.bieder_naam}:</b> €{bod.prijsInEuro}
								</Card.Title>
							</Card.Body>
						</Card>
					);
				})}
		</Container>
	);
}
