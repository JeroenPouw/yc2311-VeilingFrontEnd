import React, { useState } from "react";
import { Container, Nav, NavItem, NavLink } from "react-bootstrap";
import ProfielGegevens from "./ProfielGegevens";
import ProfielAanbiedingen from "./ProfielAanbiedingen";
import ProfielFavorieten from "./ProfielFavorieten";
import ProfielGewonnen from "./ProfielGewonnen";

export default function ProfielTabs({ user }) {
	const [activeTab, setActiveTab] = useState("aanbiedingen"); // Default active tab

	const handleTabSelect = (selectedTab) => {
		setActiveTab(selectedTab);
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "gewonnen":
				return <ProfielGewonnen user={user} />;
			case "gegevens":
				return <ProfielGegevens user={user} />;
			case "aanbiedingen":
				return <ProfielAanbiedingen user={user} />;
			case "favorieten":
				return <ProfielFavorieten user={user} />;
			default:
				return null;
		}
	};

	return (
		<Container className="mt-3">
			<Nav fill variant="tabs" activeKey={activeTab} onSelect={handleTabSelect}>
				<NavItem>
					<NavLink eventKey="aanbiedingen">Mijn aanbiedingen</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="gewonnen">Gewonnen veilingen</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="favorieten">Mijn favorieten</NavLink>
				</NavItem>
				<NavItem>
					<NavLink eventKey="gegevens">Mijn gegevens</NavLink>
				</NavItem>
			</Nav>
			{renderTabContent()}
		</Container>
	);
}
