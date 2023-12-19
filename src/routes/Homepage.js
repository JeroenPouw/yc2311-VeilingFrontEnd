import React, { useEffect, useState } from "react";
import { Col, Container, Nav, NavItem, NavLink, Row } from "react-bootstrap";
import ItemCard from "../components/ItemCard";
import { useLocation } from "react-router-dom";

export default function Homepage() {
	const location = useLocation();
	const [activeTab, setActiveTab] = useState("aanbiedingen"); // Default active tab
	const [items, setItems] = useState([]);
	const [cat, setCat] = useState("all");
	const [user, setUser] = useState({ favorieten: [], naam: "", id: 0 });

	useEffect(() => {
		async function getAccount() {
			try {
				if (location.state?.id) {
					const response = await fetch(
						`http://localhost:8082/account/${location.state.id}`
					);
					if (response.ok) {
						const data = await response.json();
						setUser(data);
					} else {
						console.error("Failed to fetch user data");
						setUser(null);
					}
				} else {
					setUser(null); // Set user to null when location.state.id doesn't exist
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
				setUser(null);
			}
		}
		getAccount();
	}, [location.state]);

	useEffect(() => {
		async function getItems() {
			try {
				const response = await fetch(
					`http://localhost:8082/veilingstukken/${cat}`
				);
				if (response.ok) {
					const data = await response.json();
					setItems(data);
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
			{user != null && <h1 className="text-center">Welkom, {user.naam}</h1>}
			<Nav fill variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
				<NavItem>
					<NavLink eventKey="Electronica">Electronica</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Huishouden">Huishouden</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Kunst">Kunst</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Mode">Mode</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Sieraden">Sieraden</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Tuin">Tuin</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="Vervoer">Vervoer</NavLink>
				</NavItem>
			</Nav>

			{user != null ? (
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
										<ItemCard user={user} item={item} />
									</Col>
								);
							})}
					</Row>
				</div>
			)}
		</>
	);
}
