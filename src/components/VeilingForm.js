import React, { useState } from "react";
import { Container, Row, Col, InputGroup, Button, Form } from "react-bootstrap";
import AlertSuccess from "../partials/AlertMessage";
import { backendURL } from "js/Backend";

export default function VeilingForm({ item }) {
	const [veiling, setVeiling] = useState({
		veilingstukId: item.id,
		openingsBodInEuros: 100,
		startDatum: new Date(new Date().setHours(new Date().getHours() + 1))
			.toISOString()
			.slice(0, 16),
		duratieInMinuten: 30,
		openingsBodInEuro: 1,
	});
	// showAlert state and showAlertHandler to toggle it
	const [showAlert, setShowAlert] = useState(false);
	const showAlertHandler = () => setShowAlert(true);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target;
		setVeiling((prevVeiling) => ({
			...prevVeiling,
			[id]: value,
		}));
	};

	const handleAlert = (message) => {
		showAlertHandler();
		setMessage(message);
	};

	const addVeiling = () => {
		const veilingJSON = JSON.stringify(veiling);
		console.log(veilingJSON);
		fetch(`${backendURL}/veilingstuk/${item.id}/veiling`, {
			method: "POST",
			body: veilingJSON,
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => r.json())
			.then((d) => window.location.reload());
	};

	return (
		<Container className="mt-3">
			<Row>
				<h3 className="text-center">Nieuwe veiling inplannen</h3>
			</Row>
			<AlertSuccess
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				message={message}
			/>
			<Row className="mt-3">
				<Col xs={10} className="m-auto mb-3">
					<Form>
						{/* Start datum */}
						<Form.Group className="mb-3">
							<Form.Label>Start datum en tijd</Form.Label>
							<Form.Control
								type="datetime-local"
								value={veiling.startDatum}
								onChange={handleChange}
								id="startDatum"
							/>
						</Form.Group>
						{/* Duratie */}
						<Form.Group className="mb-3">
							<Form.Label>Duratie in minuten</Form.Label>
							<InputGroup>
								<Form.Control
									type="number"
									value={veiling.duratieInMinuten}
									onChange={handleChange}
									id="duratieInMinuten"
								/>
								<InputGroup.Text>minuten</InputGroup.Text>
							</InputGroup>
						</Form.Group>
						{/* Openings bod */}
						<Form.Group className="mb-3">
							<Form.Label>Openings bod</Form.Label>
							<InputGroup>
								<Form.Control
									type="number"
									value={veiling.openingsBodInEuro}
									onChange={handleChange}
									id="openingsBodInEuros"
								/>
								<InputGroup.Text>euro</InputGroup.Text>
							</InputGroup>
						</Form.Group>

						<Row className="justify-items-between">
							<Col className="d-flex justify-content-end">
								<Button variant="primary" onClick={addVeiling}>
									Toevoegen
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
