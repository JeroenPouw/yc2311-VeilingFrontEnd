import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";

export default function ProfielFavorieten({ user }) {
	const items = user.favorieten;

	return (
		<Container className="mt-4">
			<Row className="justify-content-between">
				<Col xs={9} className="mb-3">
					<h2>U hebt {items.length} favorieten.</h2>
				</Col>
				<Col className="text-end"></Col>
			</Row>
			<Row xs={1} sm={1} md={2} lg={3} xxl={4} className="g-3">
				{items &&
					items.map((item) => {
						const isFavoriet =
							user &&
							user.favorieten &&
							Array.isArray(user.favorieten) &&
							user.favorieten.some((favItem) => favItem.id === item.id);
						return (
							<Col key={item.id}>
								<ItemCard user={user} item={item} isFavoriet={isFavoriet} />
							</Col>
						);
					})}
			</Row>
		</Container>
	);
}
