import React, { useEffect, useState } from "react";
import ItemTabel from "../components/ItemTabel";
import Error from "partials/Error";
import Spinner from "partials/Spinner";

export default function AdminItems() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getItems = () => {
		fetch("http://localhost:8082/veilingstukken")
			.then((r) => r.json())
			.then((d) => setItems(d))
			.then(() => setIsLoading(false));
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : items.length > 0 ? (
				<ItemTabel data={items} />
			) : (
				<Error message="Geen items gevonden." />
			)}
		</div>
	);
}
