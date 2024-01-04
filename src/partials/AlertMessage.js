import React from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertMessage({
	showAlert,
	setShowAlert,
	message,
	variant = "success",
}) {
	return (
		showAlert && (
			<Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
				{message}
			</Alert>
		)
	);
}
