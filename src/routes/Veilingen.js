import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

export default function Veilingen() {
	const [duratie, setDuratie] = useState("");
	const [openingsBod, setOpeningsBod] = useState("");
	const [minimumBod, setMinimumBod] = useState("");
	const [csharpUitkomst, setCSharpUitkomst] = useState([]);

	const handleAddClick = async () => {
		console.log("Voeg toe");
		const veiling = {
			Duratie: duratie,
			OpeningsBod: openingsBod,
			MinimumBod: minimumBod,
		};

		const veilingjson = JSON.stringify(veiling);
		console.log(veilingjson);

		try {
			const response = await fetch("https://localhost:7252/api/Veiling", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: veilingjson,
			});
		} catch (error) {
			console.error("Error:", error);
			// Handle error
		}
	};

	const handleTestClick = async () => {
		try {
			const response = await fetch("https://localhost:7252/api/Veiling");
			const data = await response.json();
			setCSharpUitkomst(data);
		} catch (error) {
			console.error("Error:", error);
			// Handle error
		}
	};

	return (
		<Container>
			<h1>Huidige Veiling</h1>
			<Form>
				<Form.Group controlId="InvoerDuratie">
					<Form.Label>Duratie:</Form.Label>
					<Form.Control
						type="text"
						value={duratie}
						onChange={(e) => setDuratie(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="InvoerOpeningsbod">
					<Form.Label>Openingsbod:</Form.Label>
					<Form.Control
						type="text"
						value={openingsBod}
						onChange={(e) => setOpeningsBod(e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="InvoerMinimumbod">
					<Form.Label>Minimumbod:</Form.Label>
					<Form.Control
						type="text"
						value={minimumBod}
						onChange={(e) => setMinimumBod(e.target.value)}
					/>
				</Form.Group>

				<div className="mt-2">
					<Button className="me-2" variant="primary" onClick={handleAddClick}>
						Add
					</Button>
					<Button variant="secondary" onClick={handleTestClick}>
						push
					</Button>
				</div>
			</Form>

			<div>
				{csharpUitkomst.map((item, index) => (
					<p key={index}>{item.duratie}</p>
				))}
			</div>
		</Container>
	);
}
