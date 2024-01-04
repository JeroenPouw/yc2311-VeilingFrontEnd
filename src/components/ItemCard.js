import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import FavorietButton from "./FavorietButton";
import { useNavigate } from "react-router-dom";
import ItemOffcanvas from "./ItemOffcanvas";

export default function ItemCard({ user = null, item, isFavoriet = null }) {
	const navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/veilingstuk/${item.id}`);
	};

	return (
		<Card className="">
			{item.fotos.length > 0 && (
				<Card.Img
					variant="top"
					src={item.fotos[0].url}
					alt={item.fotos[0].altText}
					onClick={handleCardClick}
					style={{ cursor: "pointer" }}
				/>
			)}
			<Card.Body>
				<Row className="justify-content-between">
					<Col xs={9} onClick={handleCardClick} style={{ cursor: "pointer" }}>
						<Card.Title>{item.naam}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">
							{item.categorie}
						</Card.Subtitle>
					</Col>
					<Col xs={3} className="text-end">
						{user != null &&
							(user.id == item.aanbieder_id ? (
								<ItemOffcanvas item={item} />
							) : (
								<FavorietButton
									accountID={user.id}
									itemID={item.id}
									isFav={isFavoriet}
								/>
							))}
					</Col>
				</Row>
				<Card.Text>{item.beschrijving}</Card.Text>
			</Card.Body>
		</Card>
	);
}
