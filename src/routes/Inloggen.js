import AlertMessage from "partials/AlertMessage";
import { useAuth } from "js/AuthContext";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Inloggen() {
	const navigate = useNavigate();
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [showAlert, setShowAlert] = useState(false);
	const showAlertHandler = () => setShowAlert(true);
	const [message, setMessage] = useState("");
	const { setIsLoggedIn, token, setToken } = useAuth();

	const handleAlert = (message) => {
		showAlertHandler();
		setMessage(message);
	};

	const openHomepage = (userID) => {
		if (userID) {
			navigate(`/`);
		} else {
			handleAlert("User homepage niet gevonden.");
		}
	};

	async function fetchUser(currentToken) {
		try {
			const response = await fetch("http://localhost:8082/details", {
				headers: {
					Authorization: `Bearer ${currentToken}`,
				},
			});
			if (!response.ok) {
				handleAlert("Error met het vinden van uw account. Probeer opnieuw.");
				throw new Error("Failed to fetch user details");
			}
			const userDetails = await response.json();
			openHomepage(userDetails.id);
		} catch (error) {
			handleAlert("Error met het vinden van uw account, probeer opnieuw.");
			console.error("Error fetching user details:", error);
		}
	}

	async function fetchToken(credentials) {
		try {
			const response = await fetch("http://localhost:8082/login", {
				method: "POST",
				body: credentials,
				headers: { "Content-Type": "application/json" },
			});
			if (!response.ok) {
				// Handle different types of errors appropriately
				if (response.status === 401) {
					handleAlert("Onjuiste inloggegevens, probeer opnieuw.");
				} else {
					handleAlert("Inloggen mislukt, probeer opnieuw.");
				}
				return;
			}
			const data = await response.json();
			localStorage.setItem("userToken", data.token);
			setToken(data.token); // Set token in state
			setIsLoggedIn(true);
			fetchUser(data.token); // Call fetchUser with the new token
		} catch (error) {
			console.error("Login Error:", error);
			handleAlert("Er is een fout opgetreden tijdens het inloggen.");
		}
	}

	const submitForm = async () => {
		const credentialsJSON = JSON.stringify(credentials);
		fetchToken(credentialsJSON);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			submitForm();
		}
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[id]: value,
		}));
	};

	return (
		<Container>
			<div className="container mt-3">
				<div className="row">
					<h1 className="text-center">Welkom terug!</h1>
				</div>

				<div className="row mt-3">
					<div className="col-10 m-auto mb-3">
						<AlertMessage
							showAlert={showAlert}
							setShowAlert={setShowAlert}
							message={message}
							variant="danger"
						/>
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								aria-describedby="email"
								value={credentials.email}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input
								type="password"
								className="form-control"
								value={credentials.password}
								onChange={handleChange}
								id="password"
								onKeyDown={handleKeyDown}
							/>
						</div>
						<button onClick={submitForm} className="btn btn-primary">
							Inloggen
						</button>
					</div>
				</div>
			</div>
		</Container>
	);
}
