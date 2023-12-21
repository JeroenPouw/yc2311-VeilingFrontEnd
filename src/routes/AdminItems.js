import React, { useEffect, useState } from "react";
import ItemTabel from "../components/ItemTabel";
import Error from "../partials/Error";

export default function AdminItems() {
	const [items, setItems] = useState([]);

	const getItems = () => {
		fetch("http://localhost:8082/veilingstukken")
			.then((r) => r.json())
			.then((d) => setItems(d));
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div>
			{items.length > 0 ? (
				<ItemTabel data={items} />
			) : (
				<Error message="Geen items gevonden." />
			)}
		</div>
	);
}
