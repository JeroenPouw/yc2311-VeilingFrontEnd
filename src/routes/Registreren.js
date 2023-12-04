import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Registreren() {
	const navigate = useNavigate();
	const [account, setAccount] = useState({
		email: "example@email.com",
		password: "123",
		naam: "John Doe",
		telefoon: "0699999991",
		plaats: "Den Haag",
		postcode: "2433HH",
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setAccount((prevAccount) => ({
			...prevAccount,
			[id]: value,
		}));
	};

	const openHomepage = (userID) => {
		navigate(`/profiel`, { state: { id: userID } });
	};

	const maakAccount = () => {
		const accountJSON = JSON.stringify(account);
		console.log(accountJSON);
		fetch("http://localhost:8082/maak-account", {
			method: "POST",
			body: accountJSON,
			headers: { "Content-Type": "application/json" },
		})
			.then((r) => r.json())
			.then((d) => openHomepage(d.id));
	};

	return (
		<Container>
			<Row>
				<h1 className="text-center mt-3">Maak een account</h1>
			</Row>
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
							/>
							<Form.Text className="text-muted">
								We zullen uw e-mailadres nooit met iemand anders delen.
							</Form.Text>
						</Form.Group>
						{/* Password */}
						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								value={account.password}
								onChange={handleChange}
							/>
						</Form.Group>
						{/* Naam */}
						<Form.Group className="mb-3">
							<Form.Label>Naam</Form.Label>
							<Form.Control
								type="text"
								value={account.naam}
								onChange={handleChange}
							/>
						</Form.Group>
						{/* Telefoon */}
						<Form.Group className="mb-3">
							<Form.Label>Telefoon</Form.Label>
							<Form.Control
								type="tel"
								value={account.telefoon}
								onChange={handleChange}
							/>
						</Form.Group>
						{/* Plaats */}
						<Form.Group className="mb-3">
							<Form.Label>Plaats</Form.Label>
							<Form.Control
								type="text"
								value={account.plaats}
								onChange={handleChange}
							/>
						</Form.Group>
						{/* Postcode */}
						<Form.Group className="mb-3">
							<Form.Label>Postcode</Form.Label>
							<Form.Control
								type="text"
								value={account.postcode}
								onChange={handleChange}
							/>
						</Form.Group>
						<Button variant="primary" onClick={maakAccount}>
							Aanmelden
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}