import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ItemForm from "./ItemForm";

export default function ItemOffcanvas({ item }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// showAlert state and showAlertHandler to toggle it
	const [showAlert, setShowAlert] = useState(false);
	const showAlertHandler = () => setShowAlert(true);
	const [message, setMessage] = useState("");

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Toon details
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Item details</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ItemForm veilingstuk={item} />
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
