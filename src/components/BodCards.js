import { backendURL } from "js/Backend";
import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";

export default function BodCards({ veiling }) {
	const [biedingen, setBiedingen] = useState(veiling.biedingen);

	const fetchVeiling = async () => {
		try {
			const response = await fetch(`${backendURL}/veiling/${veiling.id}`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const fetchedVeiling = await response.json();
			// Update the veiling information
			setBiedingen(fetchedVeiling.biedingen);
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
		}
	};

	useEffect(() => {
		fetchVeiling();
		const interval = setInterval(() => fetchVeiling(), 500);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<Container className="mt-4">
			{biedingen &&
				biedingen
					.slice()
					.reverse()
					.map((bod, index) => {
						return (
							<Row key={index}>
								<Card className="mb-2">
									<Card.Body>
										<Card.Title>
											<b>{bod.bieder_naam}:</b> €{bod.prijsInEuro}
										</Card.Title>
									</Card.Body>
								</Card>
							</Row>
						);
					})}
		</Container>
	);
}
