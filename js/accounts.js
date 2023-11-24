function onButtonClick() {
	console.log("even testen");
	fetch("http://localhost:8082/alle-accounts")
		.then((r) => r.json(r))
		.then((d) => console.log(d));
}

function toevoegen() {
	console.log("toevoegen");
	let account = {};
	account.naam = document.getElementById("naam").value;
	let accountJSON = JSON.stringify(account);
	console.log(accountJSON);
	fetch("http://localhost:8082/maak-account", {
		method: "POST",
		body: accountJSON,
		headers: { "Content-Type": "application/json" },
	});
}
