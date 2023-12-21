import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";

export default function AccountForm({ acc }) {
	const navigate = useNavigate();
	const [account, setAccount] = useState({
		email: acc.email,
		password: acc.password,
		naam: acc.naam,
		telefoon: acc.telefoon,
		plaats: acc.plaats,
		postcode: acc.postcode,
	});
	// showAlert state and showAlertHandler to toggle it
	const [showAlert, setShowAlert] = useState(false);
	const showAlertHandler = () => setShowAlert(true);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { id, value } = e.target;
		setAccount((prevAccount) => ({
			...prevAccount,
			[id]: value,
		}));
	};

	const handleAlert = (message) => {
		showAlertHandler();
		setMessage(message);
	};

	const editAccount = () => {
		const accountJSON = JSON.stringify(account);
		console.log(accountJSON);
		fetch(`http://localhost:8082/account/${acc.id}`, {
			method: "PUT",
			body: accountJSON,
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => r.json())
			.then((d) => handleAlert(`${d.naam} account bijgewerkt.`));
	};

	async function deleteAccount() {
		await fetch(`http://localhost:8082/account/${acc.id}`, {
			method: "DELETE",
		});
		navigate("/");
	}

	return (
		<Container>
			<AlertMessage
				showAlert={showAlert}
				setShowAlert={setShowAlert}
				message={message}
			/>
			<Row className="mt-3">
				<Col xs={10} className="m-auto mb-3">
					<Form>
						{/* Email */}
						<Form.Group className="mb-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								value={account.email}
								onChange={handleChange}
								id="email"
							/>
						</Form.Group>
						{/* Password */}
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								value={account.password}
								onChange={handleChange}
								id="password"
							/>
						</Form.Group>
						{/* Naam */}
						<Form.Group className="mb-3">
							<Form.Label>Naam</Form.Label>
							<Form.Control
								type="text"
								value={account.naam}
								onChange={handleChange}
								id="naam"
							/>
						</Form.Group>
						{/* Telefoon */}
						<Form.Group className="mb-3">
							<Form.Label>Telefoon</Form.Label>
							<Form.Control
								type="tel"
								value={account.telefoon}
								onChange={handleChange}
								id="telefoon"
							/>
						</Form.Group>
						{/* Plaats */}
						<Form.Group className="mb-3">
							<Form.Label>Plaats</Form.Label>
							<Form.Control
								type="text"
								value={account.plaats}
								onChange={handleChange}
								id="plaats"
							/>
						</Form.Group>
						{/* Postcode */}
						<Form.Group className="mb-3">
							<Form.Label>Postcode</Form.Label>
							<Form.Control
								type="text"
								value={account.postcode}
								onChange={handleChange}
								id="postcode"
							/>
						</Form.Group>
						<Row className="justify-items-between">
							<Col>
								<Button variant="primary" onClick={editAccount}>
									Wijzigen
								</Button>
							</Col>
							<Col className="d-flex justify-content-end">
								<Button
									variant="danger"
									onClick={() => {
										if (
											window.confirm(
												"Weet u zeker dat u dit account wilt verwijderen?"
											) == true
										) {
											deleteAccount();
										}
									}}
								>
									Verwijderen
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
