import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";
import AanbiedingForm from "./AanbiedingForm";
import AlertSuccess from "./AlertSuccess";

export default function ProfielAanbiedingen({ user }) {
	const [toonForm, setToonForm] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [items, setItems] = useState(user.aangeboden);

	async function getItems() {
		try {
			const response = await fetch(`http://localhost:8082/account/${user.id}`);
			if (response.ok) {
				const data = await response.json();
				setItems(data.aangeboden);
			} else {
				// Handle error cases here
				console.error("Failed to fetch user data");
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}

	useEffect(() => {
		setItems(user.aangeboden);
	}, [user.aangeboden]);

	const handleButtonClick = () => {
		setToonForm(!toonForm); // Toggle form visibility on button click
	};

	const handleFormSubmitted = () => {
		setToonForm(false); // Hide the form
		setShowAlert(true); // Show the alert
		getItems(); // refresh items on page
		setSuccessMessage("Aanbieding succesvol toegevoegd!"); // Set success message
	};

	return (
		<Container className="mt-4">
			{showAlert && (
				<AlertSuccess
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					message={successMessage}
				/>
			)}
			<Row className="justify-content-between mb-2">
				<Col xs={9}>
					<h2>U hebt {items.length} aanbiedingen.</h2>
				</Col>
				<Col className="text-end">
					<Button onClick={handleButtonClick}>Nieuwe aanbieding</Button>
				</Col>
			</Row>

			{toonForm && (
				<AanbiedingForm user={user} onFormSubmitted={handleFormSubmitted} />
			)}
			{items &&
				items.map((item) => {
					const isFavoriet =
						user &&
						user.favorieten &&
						Array.isArray(user.favorieten) &&
						user.favorieten.some((favItem) => favItem.id === item.id);
					return (
						<ItemCard
							key={item.id}
							user={user}
							item={item}
							isFavoriet={isFavoriet}
						/>
					);
				})}
		</Container>
	);
}
