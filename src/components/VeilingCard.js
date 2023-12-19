import React, { useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

export default function VeilingCard({ veiling, index }) {
	const [bod, setBod] = useState(veiling.minimumBodInEuros);

	async function maakBod() {
		await fetch(`http://localhost:8082/veiling/${veiling.id}/bod`, {
			method: "POST",
			body: JSON.stringify({ prijsInEuro: bod }),
			headers: { "Content-Type": "application/json" },
		});
	}
	function handleChange(event) {
		setBod(event.target.value);
	}
	return (
		<Card key={index} className="my-3">
			<Card.Body>
				<Card.Title>
					Begint om {new Date(veiling.startDatum).toLocaleString()}
				</Card.Title>
				<Card.Text>Duratie: {veiling.duratieInSeconden} seconden</Card.Text>
				<ul>
					<li>Openings bod: €{veiling.openingsBodInEuros}</li>
					<li>Laatste bod: €{veiling.laatsteBodInEuros}</li>
					<li>Minimum bod: €{veiling.minimumBodInEuros}</li>
				</ul>
				<InputGroup className="mb-3">
					<InputGroup.Text>€</InputGroup.Text>
					<Form.Control
						value={bod}
						onChange={handleChange}
						aria-label="Bod in euros"
					/>
					<Button onClick={maakBod} variant="outline-secondary">
						Bied
					</Button>
				</InputGroup>
			</Card.Body>
		</Card>
	);
}
