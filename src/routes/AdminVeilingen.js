import VeilingCards from "components/VeilingFormCards";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Error from "../partials/Error";

export default function AdminVeilingen() {
	const [veilingen, setVeilingen] = useState([]);

	const getVeilingen = () => {
		fetch("http://localhost:8082/veilingen")
			.then((r) => r.json())
			.then((d) => setVeilingen(d));
	};

	useEffect(() => {
		getVeilingen();
	}, []);

	return (
		<Container>
			{veilingen.length > 0 ? (
				<VeilingCards veilingen={veilingen} />
			) : (
				<Error message="Geen veilingen gevonden." />
			)}
		</Container>
	);
}
