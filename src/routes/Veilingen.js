import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from "../partials/Error";
import Spinner from "partials/Spinner";
import Countdown from "react-countdown";
import { backendURL } from "js/Backend";

export default () => {
	const [veilingen, setVeilingen] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getVeilingen() {
		await fetch(`${backendURL}/veilingen`)
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
											{veiling.veilingStatus == "SCHEDULED" && (
												<p>
													Begint:{" "}
													{new Date(veiling.startDatum).toLocaleString()}
												</p>
											)}
											{veiling.veilingStatus == "OPEN" && (
												<h2>
													<Countdown date={veiling.eindDatum} />
												</h2>
											)}
											{veiling.veilingStatus == "CLOSED" && (
												<p>
													Beëindigd:{" "}
													{new Date(veiling.eindDatum).toLocaleString()}
												</p>
											)}
										</Card.Title>
										<Card.Text>
											Duratie: {veiling.duratieInMinuten} minuten <br />
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
				</Row>
			) : (
				<Error message="Geen veilingen gevonden." />
			)}
		</Container>
	);
};
