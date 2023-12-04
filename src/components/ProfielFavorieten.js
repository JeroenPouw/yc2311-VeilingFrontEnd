import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";

export default function ProfielFavorieten({ user }) {
	const items = user.favorieten;

	return (
		<Container className="mt-4">
			<Row className="justify-content-between">
				<Col xs={9}>
					<h2>U hebt {items.length} favorieten.</h2>
				</Col>
				<Col className="text-end"></Col>
			</Row>
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
