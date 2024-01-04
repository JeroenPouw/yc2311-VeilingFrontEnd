import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function VeilingCards({ veilingen }) {
	async function deleteVeiling(veilingID) {
		await fetch(`http://localhost:8082/veiling/${veilingID}`, {
			method: "DELETE",
		});
		window.location.reload();
	}
	return (
		<Container>
			{veilingen.map((veiling, index) => (
				<Card key={index} className="mb-2">
					<Card.Body>
						<Link
							to={`/veilingstuk/${veiling.veilingstuk_id}`}
							style={{ textDecoration: "none" }}
						>
							<Card.Title>
								{new Date(veiling.startDatum).toLocaleString()}
							</Card.Title>
						</Link>
						<Card.Text>
							Duratie: {veiling.duratieInSeconden} seconden <br />
							Openings bod: €{veiling.openingsBodInEuro} <br />
							{veiling.laatsteBodInEuro > 0 ? (
								<span>Laatste bod: €{veiling.laatsteBodInEuro}</span>
							) : (
								<span>Nog geen biedingen!</span>
							)}
						</Card.Text>

						<Button
							variant="danger"
							onClick={() => {
								if (
									window.confirm(
										"Weet u zeker dat u dit item wilt verwijderen?"
									) == true
								) {
									deleteVeiling(veiling.id);
								}
							}}
						>
							Verwijderen
						</Button>
					</Card.Body>
				</Card>
			))}
		</Container>
	);
}
