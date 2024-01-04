import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from "../partials/Error";
import Spinner from "partials/Spinner";

export default () => {
	const [veilingen, setVeilingen] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getVeilingen() {
		await fetch("http://localhost:8082/veilingen")
			.then((r) => r.json())
			.then((d) => setVeilingen(d));
		setIsLoading(false);
	}

	useEffect(() => {
		getVeilingen();
	}, []);

	return (
		<Container className="mt-3">
			{isLoading ? (
				<Spinner />
			) : veilingen.length > 0 ? (
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
											Openings bod: €{veiling.openingsBodInEuro} <br />
											{veiling.laatsteBodInEuro > 0 ? (
												<span>Laatste bod: €{veiling.laatsteBodInEuro}</span>
											) : (
												<span>Nog geen biedingen!</span>
											)}
										</Card.Text>
									</Card.Body>
								</Card>
							</Link>
						</Col>
					))}
					<button
						onClick={() => {
							console.log(veilingen);
						}}
					>
						Click
					</button>
				</Row>
			) : (
				<Error message="Geen veilingen gevonden." />
			)}
		</Container>
	);
};
