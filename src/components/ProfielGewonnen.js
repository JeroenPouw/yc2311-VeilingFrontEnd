import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";

export default function ProfielFavorieten({ user }) {
	const veilingen = user.gewonnen;

	return (
		<Container className="mt-4">
			<Row className="justify-content-between">
				<Col xs={9}>
					<h2>U hebt 0 gewonnen veilingen.</h2>
					{/* <h2>U hebt {items.length} gewonnen veilingen.</h2> */}
				</Col>
				<Col className="text-end"></Col>
			</Row>
			<Row id="veiling-container"></Row>
		</Container>
	);
}
