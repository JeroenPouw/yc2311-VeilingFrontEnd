import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from "../partials/Error";

export default () => {
	const [veilingen, setVeilingen] = useState([]);

	const getVeilingen = () => {
		fetch("http://localhost:8082/veilingen")
			.then((r) => r.json())
			.then((d) => setVeilingen(d));
	};

	useEffect(() => {
		getVeilingen();
	}, []);
	return (
		<Container className="mt-3">
			{veilingen.length > 0 ? (
				<Row>
					{veilingen.map((veiling, index) => (
						<Col key={index} xs={12} md={6} xl={3}>
							<Link
								to={`/veilingstuk/${veiling.veilingstuk_id}`}
								style={{ textDecoration: "none" }}
							>
								<Card className="mb-2">
									<Card.Body>
										<Card.Title>
											{new Date(veiling.startDatum).toLocaleString()}
										</Card.Title>
										<Card.Text>
											Duratie: {veiling.duratieInSeconden} seconden <br />
											Openings bod: €{veiling.openingsBodInEuros} <br />
											{veiling.laatsteBodInEuros > 0 ? (
												<span>Laatste bod: €{veiling.laatsteBodInEuros}</span>
											) : (
												<span>Nog geen biedingen!</span>
											)}
										</Card.Text>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					))}
				</Row>
			) : (
				<Error message="Geen veilingen gevonden." />
			)}
		</Container>
	);
};
