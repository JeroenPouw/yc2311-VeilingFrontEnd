import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import AccountForm from "./AccountForm";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

export default function AccountOffcanvas({ account }) {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const openHomepage = (userID) => {
		if (userID) {
			navigate(`/persoonlijke-homepage`, {
				state: { id: userID },
			});
		} else {
			// inloggegevens niet gevonden;
		}
	};

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
					<Container>
						<Row className="justify-items-evenly">
							<Col className="text-center">
								<Button
									onClick={() => {
										navigate(`/persoonlijke-homepage`, {
											state: { id: account.id },
										});
									}}
								>
									Homepage
								</Button>
							</Col>
							<Col className="text-center">
								<Button
									onClick={() => {
										navigate(`/profiel`, {
											state: { id: account.id },
										});
									}}
								>
									Profiel
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
