import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Inloggen() {
	const navigate = useNavigate();
	const openHomepage = (userID) => {
		if (userID) {
			navigate(`/profiel`, {
				state: { id: Math.floor(Math.random() * 10) },
			});
		} else {
			// inloggegevens niet gevonden;
		}
	};

	return (
		<Container>
			<div className="container mt-3">
				<div className="row">
					<h1 className="text-center">Welkom terug!</h1>
				</div>
				<div className="row mt-3">
					<div className="col-10 m-auto mb-3">
						<div className="mb-3">
							<label htmlFor="email" className="form-label">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								aria-describedby="email"
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">
								Password
							</label>
							<input type="password" className="form-control" id="password" />
						</div>
						<button onClick={openHomepage} className="btn btn-primary">
							Inloggen
						</button>
					</div>
				</div>
			</div>
		</Container>
	);
}
