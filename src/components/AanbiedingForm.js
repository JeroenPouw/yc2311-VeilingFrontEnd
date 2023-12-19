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

export default function AanbiedingForm({ user, onFormSubmitted }) {
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
	const [fotoID, setFotoID] = useState(0);
	// showAlert state and showAlertHandler to toggle it
	const [showAlert, setShowAlert] = useState(false);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setItem((prevItem) => ({
			...prevItem,
			[id]: value,
		}));
	};

	const addItem = () => {
		const itemJSON = JSON.stringify(item);
		console.log(itemJSON);
		if (fotoID != 0) {
			fetch(
				`http://localhost:8082/account/${user.id}/aanbieden/foto/${fotoID}`,
				{
					method: "POST",
					body: itemJSON,
					headers: { "Content-Type": "application/json" },
				}
			)
				.then((r) => r.json())
				.then((d) => {
					onFormSubmitted();
				});
		} else {
			fetch(`http://localhost:8082/account/${user.id}/aanbieden`, {
				method: "POST",
				body: itemJSON,
				headers: { "Content-Type": "application/json" },
			})
				.then((r) => r.json())
				.then((d) => {
					onFormSubmitted();
				});
		}
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const uploadImage = async () => {
		setUploading(true);
		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await fetch(`http://localhost:8082/upload`, {
				method: "POST",
				body: formData,
			});

			setUploading(false);
			if (response.ok) {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					const data = await response.json();
					console.log("File uploaded successfully: " + data.url);

					// Update state with the new image
					setFotoID(data.id);
				} else {
					const text = await response.text(); // Handle non-JSON responses
					console.log("File uploaded successfully: " + text);
				}
			} else {
				console.error("Failed to upload file");
			}
		} catch (error) {
			console.error("Error: " + error.message);
			setUploading(false);
		}
	};

	const handleUpload = (event) => {
		event.preventDefault();
		if (!selectedFile) {
			console.log("Please select a file first!");
			return;
		}

		uploadImage();
	};

	return (
		<Container className="m-3">
			<Card>
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
							{fotoID === 0 ? (
								<>
									<Form.Group controlId="formFile" className="mb-3">
										<Form.Control type="file" onChange={handleFileChange} />
									</Form.Group>
									<Row className="justify-items-between">
										{uploading && <p>Uploading...</p>}
										<Col className="d-flex justify-content-end">
											<Button
												onClick={handleUpload}
												variant="secondary"
												type="submit"
												className="ms-auto mb-1"
											>
												Upload
											</Button>
										</Col>
									</Row>
								</>
							) : (
								<AlertSuccess
									showAlert={true}
									setShowAlert={setShowAlert}
									message={
										"Foto toegevoegd. U kunt later meer fotos toevoegen."
									}
								/>
							)}
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
