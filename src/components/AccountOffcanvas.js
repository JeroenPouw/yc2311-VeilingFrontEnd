import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import AccountForm from "./AccountForm";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useAuth } from "js/AuthContext";
import AlertMessage from "../partials/AlertMessage";
import { backendURL } from "js/Backend";

export default function AccountOffcanvas({ account }) {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { setIsLoggedIn, setToken } = useAuth();

	async function fetchToken(credentials) {
		try {
			const response = await fetch(`${backendURL}/login`, {
				method: "POST",
				body: credentials,
				headers: { "Content-Type": "application/json" },
			});
			if (!response.ok) {
				throw new Error("Login failed");
			}
			const data = await response.json();
			// Handle successful login, store token, etc.
			localStorage.clear();
			localStorage.setItem("userToken", data.token); // Storing token in localStorage
			setToken(data.token);
			setIsLoggedIn(true);
		} catch (error) {
			console.error("Login Error:", error);
			setShowAlert(true);
		}
	}

	function inloggenAls(user) {
		const credentials = { email: user.email, password: user.password };
		const credentialsJSON = JSON.stringify(credentials);
		fetchToken(credentialsJSON);
	}

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Toon details
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Account details</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<AlertMessage
						showAlert={showAlert}
						setShowAlert={setShowAlert}
						message={"Er is iets misgegaan. Probeer opnieuw."}
					></AlertMessage>
					<Container>
						<Row className="justify-items-evenly">
							<Col className="text-center">
								<Button
									onClick={() => {
										inloggenAls(account);
										navigate("/");
										navigate(0);
									}}
								>
									Inloggen als {account.naam}
								</Button>
							</Col>
						</Row>
					</Container>
					<AccountForm acc={account} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
