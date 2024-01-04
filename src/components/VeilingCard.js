import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import AlertMessage from "../partials/AlertMessage";
import BodCards from "./BodCards";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

export default function VeilingCard({ veilingProp, veilingID, index, userID }) {
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const [veiling, setVeiling] = useState(veilingProp);
	const [bod, setBod] = useState(veiling.minimumBodInEuro);
	const [endDate, setEndDate] = useState(new Date());

	const fetchVeiling = async () => {
		try {
			const response = await fetch(
				`http://localhost:8082/veiling/${veilingID}`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const updatedVeiling = await response.json();
			// Update the veiling information
			setVeiling(updatedVeiling);
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
		}
	};

	useEffect(() => {
		fetchVeiling();
		// Refresh the veiling data every 30 seconds (adjust as needed)
		const interval = setInterval(fetchVeiling, 3000);
		// Clean up the interval to avoid memory leaks
		return () => clearInterval(interval);
	});

	useEffect(() => {
		if (veiling.startDatum && veiling.duratieInMinuten) {
			const end = new Date(veiling.startDatum);
			end.setMinutes(end.getMinutes() + veiling.duratieInMinuten);
			setEndDate(end);
		}
	}, [veiling]);

	async function maakBod() {
		if (bod < veiling.minimumBodInEuro) {
			setMessage(`De minimumbod is €${veiling.minimumBodInEuro}.`);
			setAlertVariant("danger");
			setShowAlert(true);
		} else {
			const response = await fetch(
				`http://localhost:8082/veiling/${veilingID}/account/${userID}/bod`,
				{
					method: "POST",
					body: JSON.stringify({ prijsInEuro: bod }),
					headers: { "Content-Type": "application/json" },
				}
			);
			if (response.ok) {
				setMessage(`U hebt een bod van €${bod} geplaatst.`);
				setAlertVariant("success");
				setShowAlert(true);
			} else {
				console.log(response);
				setMessage(`Er ging iets mis. Bod niet geplaatst.`);
				setAlertVariant("danger");
				setShowAlert(true);
			}
		}
	}

	function handleChange(event) {
		setBod(event.target.value);
	}

	async function handleBiedClick() {
		if (userID === 0) {
			navigate("/registreren");
		}
		await maakBod();
		await fetchVeiling();
		setBod(veiling.minimumBodInEuro);
		await fetchVeiling();
	}

	return (
		<Card key={index} className="my-3">
			<Card.Body>
				<Card.Title>
					{veiling.veilingStatus == "SCHEDULED" ||
						(veiling.veilingStatus == null && (
							<p>
								Veiling begint om{" "}
								{new Date(veiling.startDatum).toLocaleString()}
							</p>
						))}
					{veiling.veilingStatus == "OPEN" && (
						<h2>
							<Countdown date={endDate} />
						</h2>
					)}
					{veiling.veilingStatus == "CLOSED" && (
						<p>Veiling beëindigd op {new Date(endDate).toLocaleString()}</p>
					)}
				</Card.Title>

				<Card.Text>
					Duratie: {veiling.duratieInMinuten} minuten <br />
					Eindigt: {new Date(endDate).toLocaleString()}
				</Card.Text>

				<ul>
					<li>Openings bod: €{veiling.openingsBodInEuro}</li>
					<li>Laatste bod: €{veiling.laatsteBodInEuro}</li>
					<li>Minimum bod: €{veiling.minimumBodInEuro}</li>
				</ul>
				<InputGroup className="mb-3">
					<InputGroup.Text>€</InputGroup.Text>
					<Form.Control
						type="number"
						value={bod}
						onChange={handleChange}
						aria-label="Bod in euros"
						min={veiling.minimumBodInEuro}
					/>
					<Button onClick={handleBiedClick} variant="outline-secondary">
						Bied
					</Button>
				</InputGroup>
				<AlertMessage
					showAlert={showAlert}
					setShowAlert={setShowAlert}
					message={message}
					variant={alertVariant}
				/>
				<BodCards veiling={veiling} />
			</Card.Body>
		</Card>
	);
}
