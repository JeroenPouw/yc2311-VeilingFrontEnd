import ItemCard from "components/ItemCard";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function PersoonlijkeHomepage() {
	const location = useLocation();
	const [user, setUser] = useState({ favorieten: [], naam: "", id: 0 });
	const [items, setItems] = useState([]);

	useEffect(() => {
		async function getAccount() {
			try {
				const response = await fetch(
					`http://localhost:8082/account/${location.state?.id}`
				);
				if (response.ok) {
					const data = await response.json();
					setUser(data);
				} else {
					// Handle error cases here
					console.error("Failed to fetch user data");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}

		if (location.state?.id) {
			getAccount();
		}
	}, [location.state]);

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
			<h1 className="text-center">Welkom, {user.naam}</h1>
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
