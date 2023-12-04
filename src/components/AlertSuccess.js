import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertSuccess({ showAlert, setShowAlert, message }) {
	return (
		showAlert && (
			<Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
				{message}
			</Alert>
		)
	);
}
