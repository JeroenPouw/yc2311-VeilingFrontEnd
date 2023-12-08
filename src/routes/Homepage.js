import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ItemCard from "../components/ItemCard";

export default function Homepage() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		async function getItems() {
			try {
				const response = await fetch(`http://localhost:8082/veilingstukken`);
				if (response.ok) {
					const data = await response.json();
					setItems(data);
				} else {
					// Handle error cases here
					console.error("Failed to fetch items");
				}
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		}

		getItems();
	});
	return (
		<Container fluid className="mt-2">
			<h1 className="text-center">Welkom.</h1>
			<Row id="item-container">
				{items &&
					items.map((item) => {
						return <ItemCard key={item.id} item={item} />;
					})}
			</Row>
		</Container>
	);
}
