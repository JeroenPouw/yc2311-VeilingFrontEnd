import VeilingCards from "components/VeilingFormCards";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

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
			<VeilingCards veilingen={veilingen} />
		</Container>
	);
}
