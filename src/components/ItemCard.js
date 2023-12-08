import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import FavorietButton from "./FavorietButton";

export default function ItemCard({ user = null, item, isFavoriet = null }) {
	return (
		<Col key={item.id} xs={12} md={6} xl={3}>
			<Card className="m-2">
				<Card.Body>
					<Row className="justify-content-between">
						<Col xs={9}>
							<Card.Title>{item.naam}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{item.categorie}
							</Card.Subtitle>
						</Col>
						<Col className="text-end">
							{user != null && (
								<FavorietButton
									accountID={user.id}
									itemID={item.id}
									isFav={isFavoriet}
								/>
							)}
						</Col>
					</Row>
					<Card.Text>{item.beschrijving}</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
}
