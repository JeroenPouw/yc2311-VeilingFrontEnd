import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import AlertMessage from "../partials/AlertMessage";
import BodCards from "./BodCards";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { backendURL } from "js/Backend";

export default function VeilingCard({ veilingProp, veilingID, index, userID }) {
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);
	const [message, setMessage] = useState("");
	const [alertVariant, setAlertVariant] = useState("success");
	const [veiling, setVeiling] = useState(veilingProp);
	const [bod, setBod] = useState(veiling.minimumBodInEuro);
	const [winnaar, setWinnaar] = useState("");
	const [inputBod, setInputBod] = useState(veiling.minimumBodInEuro);

	const fetchVeiling = async () => {
		try {
			const response = await fetch(`${backendURL}/veiling/${veilingID}`);
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
		setBod(veiling.minimumBodInEuro);
	}, [veiling.minimumBodInEuro]);

	useEffect(() => {
		const checkWinnaar = async () => {
			try {
				const response = await fetch(
					`${backendURL}/veiling/${veilingID}/winnaar`
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const result = await response.json();
				if (result.naam === "Geen winnaar") {
					setWinnaar("Niemand heeft gewonnen.");
				} else {
					setWinnaar(`${result.naam} heeft gewonnen.`);
				}
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			}
		};
		if (veiling.veilingStatus === "CLOSED") {
			checkWinnaar();
		}
	}, [veiling.veilingStatus]);

	async function maakBod() {
		if (bod < veiling.minimumBodInEuro) {
			setMessage(`De minimumbod is €${veiling.minimumBodInEuro}.`);
			setAlertVariant("danger");
			setShowAlert(true);
		} else {
			const response = await fetch(
				`${backendURL}/veiling/${veilingID}/account/${userID}/bod`,
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
		setInputBod(event.target.value);
	}

	async function handleBiedClick() {
		if (userID === 0) {
			navigate("/inloggen");
		}
		await maakBod();
		await fetchVeiling();
		setInputBod(veiling.minimumBodInEuro);
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
							<Countdown date={veiling.eindDatum} />
						</h2>
					)}
					{veiling.veilingStatus == "CLOSED" && (
						<p>
							Veiling beëindigd op{" "}
							{new Date(veiling.eindDatum).toLocaleString()}
						</p>
					)}
				</Card.Title>

				<Card.Text>
					Duratie: {veiling.duratieInMinuten} minuten <br />
					Eindigt: {new Date(veiling.eindDatum).toLocaleString()}
				</Card.Text>

				<ul>
					<li>Openings bod: €{veiling.openingsBodInEuro}</li>
					<li>Laatste bod: €{veiling.laatsteBodInEuro}</li>
					<li>Minimum bod: €{veiling.minimumBodInEuro}</li>
				</ul>
				{winnaar ? (
					<h5>{winnaar}</h5>
				) : (
					<InputGroup className="mb-3">
						<InputGroup.Text>€</InputGroup.Text>
						<Form.Control
							type="number"
							value={bod}
							onChange={handleChange}
							aria-label="Bod in euros"
							min={veiling.minimumBodInEuro}
							disabled={veiling.veilingStatus != "OPEN"}
						/>
						<Button
							onClick={handleBiedClick}
							variant="outline-secondary"
							disabled={veiling.veilingStatus != "OPEN"}
						>
							Bied
						</Button>
					</InputGroup>
				)}
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
