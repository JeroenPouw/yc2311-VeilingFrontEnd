import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";
import AanbiedingForm from "./AanbiedingForm";

export default function ProfielAanbiedingen({ user }) {
	const [toonForm, setToonForm] = useState(false);
	const items = user.aangeboden;

	const handleButtonClick = () => {
		setToonForm(!toonForm); // Toggle form visibility on button click
	};

	return (
		<Container className="mt-4">
			<Row className="justify-content-between">
				<Col xs={9}>
					<h2>U hebt {items.length} aanbiedingen.</h2>
				</Col>
				<Col className="text-end">
					<Button onClick={handleButtonClick}>Nieuwe aanbieding</Button>
				</Col>
			</Row>
			{toonForm && <AanbiedingForm account={user} />}
			<Row id="item-container">
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
			</Row>
		</Container>
	);
}
