import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	InputGroup,
	Card,
} from "react-bootstrap";
import AlertSuccess from "./AlertSuccess";
import ImageUploader from "./ImageUploader";

export default function AanbiedingForm({ account }) {
	const [item, setItem] = useState({
		naam: "",
		categorie: "",
		productieDatum: "",
		beschrijving: "",
		gewicht: "",
		breedte: "",
		lengte: "",
		hoogte: "",
		fotos: [],
	});
	// showAlert state and showAlertHandler to toggle it
	const [showAlert, setShowAlert] = useState(false);
	const showAlertHandler = () => setShowAlert(true);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target;
		setItem((prevItem) => ({
			...prevItem,
			[id]: value,
		}));
	};

	const handleAlert = (message) => {
		showAlertHandler();
		setMessage(message);
	};

	const addItem = () => {
		const itemJSON = JSON.stringify(item);
		console.log(itemJSON);
		fetch(`http://localhost:8082/account/${account.id}/aanbieden`, {
			method: "POST",
			body: itemJSON,
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => r.json())
			.then((d) => handleAlert(`${d.naam} toegevoegd.`));
		window.location.reload();
	};

	return (
		<Container>
			<Card>
				<AlertSuccess
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					message={message}
				/>
				<Row className="mt-3">
					<Col xs={10} className="m-auto mb-3">
						<Form>
							{/* Naam */}
							<Form.Group className="mb-3">
								<Form.Label>Product naam</Form.Label>
								<Form.Control
									type="text"
									value={item.naam}
									onChange={handleChange}
									id="naam"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Categorie</Form.Label>
								<Form.Control
									type="text"
									value={item.categorie}
									onChange={handleChange}
									id="categorie"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Productie datum</Form.Label>
								<Form.Control
									type="date"
									value={item.productieDatum}
									onChange={handleChange}
									id="productieDatum"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Beschrijving</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									value={item.beschrijving}
									onChange={handleChange}
									id="beschrijving"
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Grootte (cm)</Form.Label>
								<InputGroup>
									<InputGroup.Text>H</InputGroup.Text>
									<Form.Control
										type="text"
										value={item.hoogte}
										onChange={handleChange}
										id="hoogte"
									/>
									<InputGroup.Text>B</InputGroup.Text>
									<Form.Control
										type="text"
										value={item.breedte}
										onChange={handleChange}
										id="breedte"
									/>
									<InputGroup.Text>L</InputGroup.Text>
									<Form.Control
										type="text"
										value={item.lengte}
										onChange={handleChange}
										id="lengte"
									/>
								</InputGroup>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label>Gewicht</Form.Label>
								<InputGroup>
									<Form.Control
										type="text"
										value={item.gewicht}
										onChange={handleChange}
										id="gewicht"
									/>
									<InputGroup.Text>g</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Row className="justify-items-between">
								<Col></Col>
								<Col className="d-flex justify-content-end">
									<Button variant="primary" onClick={addItem}>
										Toevoegen
									</Button>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
			</Card>
		</Container>
	);
}
