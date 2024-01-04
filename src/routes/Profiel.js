import ProfielTabs from "components/ProfielTabs";
import { useAuth } from "js/AuthContext";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Spinner from "partials/Spinner";
import { backendURL } from "js/Backend";

export default function Profiel() {
	const [user, setUser] = useState({
		id: 0,
		favorieten: [],
		aangeboden: [],
		email: "",
		password: "",
		naam: "",
		telefoon: "",
		plaats: "",
		postcode: "",
	});
	const { isLoggedIn, setIsLoggedIn, token, setToken } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchUser() {
			try {
				if (token) {
					const response = await fetch(`${backendURL}/details`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response.status === 401) {
						// Token is invalid or expired
						console.error("Token expired or invalid");
						localStorage.removeItem("userToken");
						setToken(null);
						setIsLoggedIn(false);
						setUser(null);
						setIsLoading(false);
						return;
					}
					if (!response.ok) {
						console.error("Failed to fetch user data");
						setUser(null);
						return;
					}
					const userDetails = await response.json();
					setUser(userDetails);
					setIsLoading(false);
				} else {
					console.log("No token in storage");
					setUser(null);
					setIsLoggedIn(false);
					setIsLoading(false);
				}
			} catch (error) {
				console.error("Error fetching user details:", error);
				setUser(null);
				setIsLoggedIn(false);
				setIsLoading(false);
			}
		}
		if (token) {
			fetchUser();
		}
	}, [token]);

	return (
		<Container className="mt-3">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<h1 className="text-center mb-5">Welkom, {user.naam}!</h1>
					<ProfielTabs user={user} />
				</>
			)}
		</Container>
	);
}
