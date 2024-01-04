import React, { useEffect, useState } from "react";
import AccountTabel from "../components/AccountTabel";
import Error from "../partials/Error";
import Spinner from "partials/Spinner";
import { backendURL } from "js/Backend";

export default function AdminAccounts() {
	const [accounts, setAccounts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function getAccounts() {
		await fetch(`${backendURL}/alle-accounts`)
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
