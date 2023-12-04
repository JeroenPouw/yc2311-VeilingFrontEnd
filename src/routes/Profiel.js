import ProfielTabs from "components/ProfielTabs";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Profiel() {
	const location = useLocation();
	const [user, setUser] = useState({
		id: 22,
		favorieten: [],
		aangeboden: [],
		email: "example@email.com",
		password: "123",
		naam: "John Doe",
		telefoon: "0699999991",
		plaats: "Den Haag",
		postcode: "2433HH",
	});

	useEffect(() => {
		async function getAccount() {
			try {
				const response = await fetch(
					`http://localhost:8082/account/${location.state?.id}`
				);
				if (response.ok) {
					const data = await response.json();
					setUser(data);
				} else {
					// Handle error cases here
					console.error("Failed to fetch user data");
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		}

		if (location.state?.id) {
			getAccount();
		}
	}, [location.state]);

	return (
		<Container className="mt-3">
			<h1 className="text-center mb-5">Welkom, {user.naam}!</h1>
			<ProfielTabs user={user} />
		</Container>
	);
}
