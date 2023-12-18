import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	Alert,
	InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertSuccess from "./AlertSuccess";
import ImageUploader from "./ImageUploader";

export default function ItemForm({ veilingstuk }) {
	const navigate = useNavigate();
	const [item, setItem] = useState({
		naam: veilingstuk.naam,
		categorie: veilingstuk.categorie,
		productieDatum: veilingstuk.productieDatum,
		beschrijving: veilingstuk.beschrijving,
		gewicht: veilingstuk.gewicht,
		breedte: veilingstuk.breedte,
		lengte: veilingstuk.lengte,
		hoogte: veilingstuk.hoogte,
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

	const editItem = () => {
		const itemJSON = JSON.stringify(item);
		console.log(itemJSON);
		fetch(`http://localhost:8082/veilingstuk/${veilingstuk.id}`, {
			method: "PUT",
			body: itemJSON,
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => r.json())
			.then((d) => handleAlert(`${d.naam} Item bijgewerkt.`));
	};

	async function deleteItem() {
		await fetch(`http://localhost:8082/veilingstuk/${veilingstuk.id}`, {
			method: "DELETE",
		});
		window.location.reload();
	}

	return (
		<Container>
			<Row>
				<h1 className="text-center">{veilingstuk.naam}</h1>
			</Row>
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
							<Col>
								<Button
									variant="danger"
									onClick={() => {
										if (
											window.confirm(
												"Weet u zeker dat u dit item wilt verwijderen?"
											) == true
										) {
											deleteItem();
										}
									}}
								>
									Verwijderen
								</Button>
							</Col>
							<Col className="d-flex justify-content-end">
								<Button variant="primary" onClick={editItem}>
									Wijzigen
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
