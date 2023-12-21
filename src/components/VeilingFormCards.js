import React from "react";
import { Button, Card, Container } from "react-bootstrap";

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
						<Card.Title>
							{new Date(veiling.startDatum).toLocaleString()}
						</Card.Title>
						<Card.Text>
							Duratie: {veiling.duratieInSeconden} seconden <br />
							Openings bod: €{veiling.openingsBodInEuro}
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
