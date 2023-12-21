import React from "react";
import { useRouteError } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export default function ErrorPage({ message = null }) {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<Alert variant="secondary" className="m-5">
				<Alert.Heading>Oops!</Alert.Heading>
				<p>Sorry, er is een onverwachte fout opgetreden.</p>
				<hr />
				<p className="mb-0">
					{message === null ? (
						// @ts-ignore
						<i>{error.statusText || error.message}</i>
					) : (
						<i>{message}</i>
					)}
				</p>
			</Alert>
		</div>
	);
}
