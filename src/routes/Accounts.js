import React, { useEffect, useState } from "react";
import AccountTabel from "../components/AccountTabel";

export default function AccountComponent() {
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
			<AccountTabel data={accounts} />
		</div>
	);
}
