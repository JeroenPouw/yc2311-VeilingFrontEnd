import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Homepage from "./Homepage";
import PersoonlijkeHomepage from "./PersoonlijkeHomepage";

function App() {
	let location = useLocation();
	const [ingelogd, setIngelogd] = useState(false);
	useEffect(() => {
		// Controleer of location.state en location.state.id bestaan
		if (location.state && location.state.id) {
			setIngelogd(true);
		}
	}, [location.state]); // Voeg location.state toe aan de afhankelijkheden van useEffect

	return <Homepage />;
}

export default App;
