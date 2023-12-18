import React, { useState } from "react";
import {
	Button,
	Col,
	Container,
	Form,
	Row,
	Image,
	CloseButton,
	Card,
} from "react-bootstrap";

export default function ImageUploader({ item }) {
	const [selectedFile, setSelectedFile] = useState(null);
	const [fotos, setFotos] = useState(item.fotos);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const uploadImage = async () => {
		setUploading(true);
		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await fetch(
				`http://localhost:8082/veilingstuk/${item.id}/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			setUploading(false);
			if (response.ok) {
				const contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					const data = await response.json();
					console.log("File uploaded successfully: " + data.url);

					// Update state with the new image
					setFotos([...fotos, { url: data.url, altText: null }]);
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

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!selectedFile) {
			console.log("Please select a file first!");
			return;
		}

		uploadImage();
	};

	async function handleDelete(fotoID) {
		await fetch(`http://localhost:8082/foto/${fotoID}`, {
			method: "DELETE",
		});
		const updatedFotos = fotos.filter((img) => img.id !== fotoID);
		setFotos(updatedFotos);
	}

	return (
		<Container className="mb-3">
			<Card className="mt-3">
				<Card.Body>
					<Card.Title>
						<h3 className="text-center">Voeg foto toe</h3>
					</Card.Title>

					<Col className="m-auto mb-3">
						<Form.Group controlId="formFile" className="mb-3">
							<Form.Control type="file" onChange={handleFileChange} />
						</Form.Group>
						<Row>
							{item.fotos.length > 0 && (
								<>
									<h5>Huidige fotos: </h5>
									{item.fotos.map((img, index) => (
										<Col xs={6} md={4} key={index}>
											<Card>
												<CloseButton
													onClick={() => {
														if (
															window.confirm(
																"Weet u zeker dat u deze foto wilt verwijderen?"
															) == true
														) {
															handleDelete(img.id);
														}
													}}
												/>
												<Image src={img.url} alt={img.altText} thumbnail />
											</Card>
										</Col>
									))}
								</>
							)}
						</Row>
						<Row className="justify-items-between">
							{uploading && <p>Uploading...</p>}
							<Col className="d-flex justify-content-end">
								<Button
									onClick={handleSubmit}
									variant="primary"
									type="submit"
									className="ms-auto"
								>
									Upload
								</Button>
							</Col>
						</Row>
					</Col>
				</Card.Body>
			</Card>
		</Container>
	);
}
