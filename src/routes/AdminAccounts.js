import React, { useEffect, useState } from "react";
import AccountTabel from "../components/AccountTabel";
import Error from "../partials/Error";
import Spinner from "partials/Spinner";

export default function AdminAccounts() {
	const [accounts, setAccounts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getAccounts() {
		await fetch("http://localhost:8082/alle-accounts")
			.then((r) => r.json())
			.then((d) => setAccounts(d));
		setIsLoading(false);
	}

	useEffect(() => {
		getAccounts();
	}, []);

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : accounts.length > 0 ? (
				<AccountTabel data={accounts} />
			) : (
				<Error message="Geen accounts gevonden." />
			)}
		</div>
	);
}
