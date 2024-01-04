import React, { useEffect, useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row } from "react-bootstrap";
import ItemCard from "../components/ItemCard";
import { useAuth } from "js/AuthContext";
import Spinner from "partials/Spinner";

export default function Homepage() {
	const [activeTab, setActiveTab] = useState("Alle"); // Default active tab
	const [items, setItems] = useState([]);
	const [cat, setCat] = useState("all");
	const [user, setUser] = useState({ favorieten: [], naam: "", id: 0 });
	const [isLoading, setIsLoading] = useState(true);
	const { isLoggedIn, setIsLoggedIn, token, setToken } = useAuth();

	useEffect(() => {
		async function fetchUser() {
			try {
				if (token) {
					const response = await fetch("http://localhost:8082/details", {
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
						return;
					}
					if (!response.ok) {
						console.error("Failed to fetch user data");
						setUser(null);
						return;
					}
					const userDetails = await response.json();
					setUser(userDetails);
				} else {
					console.log("No token in storage");
					setUser(null);
				}
			} catch (error) {
				console.error("Error fetching user details:", error);
				setUser(null);
			}
		}
		if (token) {
			fetchUser();
		}
	}, [token]);

	useEffect(() => {
		async function getItems() {
			try {
				const response = await fetch(
					`http://localhost:8082/veilingstukken/${cat}`
				);
				if (response.ok) {
					const data = await response.json();
					setItems(data);
					setIsLoading(false);
				} else {
					// Handle error cases here
					console.error("Failed to fetch items");
				}
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		}

		getItems();
	}, [cat]);
	const handleTabSelect = (selectedTab) => {
		setActiveTab(selectedTab);
		switch (selectedTab) {
			case "Alle":
				setCat("all");
				break;
			case "Electronica":
				setCat("Electronica");
				break;
			case "Huishouden":
				setCat("Huishouden");
				break;
			case "Kunst":
				setCat("Kunst");
				break;
			case "Mode":
				setCat("Mode");
				break;
			case "Sieraden":
				setCat("Sieraden");
				break;
			case "Tuin":
				setCat("Tuin");
				break;
			case "Vervoer":
				setCat("Vervoer");
				break;
			default:
				break;
		}
	};

	return (
		<>
			{isLoggedIn && <h1 className="text-center">Welkom, {user.naam}!</h1>}
			<Nav
				fill
				variant="underline"
				activeKey={activeTab}
				onSelect={handleTabSelect}
				style={{ color: "black" }}
			>
				<NavItem>
					<NavLink eventKey="Alle" style={{ color: "grey" }}>
						Alle Categorieën
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Electronica" style={{ color: "grey" }}>
						Electronica
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Huishouden" style={{ color: "grey" }}>
						Huishouden
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Kunst" style={{ color: "grey" }}>
						Kunst
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Mode" style={{ color: "grey" }}>
						Mode
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Sieraden" style={{ color: "grey" }}>
						Sieraden
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Tuin" style={{ color: "grey" }}>
						Tuin
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Vervoer" style={{ color: "grey" }}>
						Vervoer
					</NavLink>
				</NavItem>
			</Nav>
			{isLoading ? (
				<Spinner />
			) : isLoggedIn ? (
				<div className="m-3">
					<Row xs={1} sm={2} md={3} lg={4} xxl={5} className="g-4">
						{items &&
							items.map((item) => {
								const isFavoriet =
									user &&
									user.favorieten &&
									Array.isArray(user.favorieten) &&
									user.favorieten.some((favItem) => favItem.id === item.id);
								return (
									<Col key={item.id}>
										<ItemCard user={user} item={item} isFavoriet={isFavoriet} />
									</Col>
								);
							})}
					</Row>
				</div>
			) : (
				<div className="m-3">
					<Row xs={1} sm={2} md={3} lg={4} xxl={5} className="g-4">
						{items &&
							items.map((item) => {
								return (
									<Col key={item.id}>
										<ItemCard item={item} />
									</Col>
								);
							})}
					</Row>
				</div>
			)}
		</>
	);
}
