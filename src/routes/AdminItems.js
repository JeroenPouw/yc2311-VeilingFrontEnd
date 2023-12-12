import React, { useEffect, useState } from "react";
import AccountTabel from "../components/AccountTabel";
import ItemTabel from "../components/ItemTabel";

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
			<ItemTabel data={items} />
		</div>
	);
}
