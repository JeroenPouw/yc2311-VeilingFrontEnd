import React, { useEffect, useState } from "react";
import AccountTabel from "../components/AccountTabel";
import Error from "../partials/Error";

export default function AdminAccounts() {
	const [accounts, setAccounts] = useState([]);

	const getAccounts = () => {
		fetch("http://localhost:8082/alle-accounts")
			.then((r) => r.json())
			.then((d) => setAccounts(d));
	};

	useEffect(() => {
		getAccounts();
	}, []);

	return (
		<div>
			{accounts.length > 0 ? (
				<AccountTabel data={accounts} />
			) : (
				<Error message="Geen accounts gevonden." />
			)}
		</div>
	);
}
