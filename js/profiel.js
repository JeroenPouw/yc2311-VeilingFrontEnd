let userID = 0;

function getAccount(accountID) {
	fetch(`http://localhost:8082/account/${accountID}`)
		.then((r) => r.json(r))
		.then((d) => toonProfiel(d));
}

window.onload = function () {
	const url_string = window.location.href; // www.test.com?filename=test
	const url = new URL(url_string);
	const accountID = url.searchParams.get("accountid");
	userID = accountID;
	console.log(userID);
	getAccount(accountID);
};

function toonProfiel(data) {
	const container = document.getElementById("welkom-container");
	const h1 = document.createElement("h1");
	h1.innerText = `Hallo, ${data.naam}!`;
	container.appendChild(h1);

	document.getElementById("email").value = data.email;
	document.getElementById("password").value = data.password;
	document.getElementById("naam").value = data.naam;
	document.getElementById("telefoon").value = data.telefoon;
	document.getElementById("plaats").value = data.plaats;
	document.getElementById("postcode").value = data.postcode;
}

function editAccount() {
	let account = {};

	account.email = document.getElementById("email").value;
	account.password = document.getElementById("password").value;
	account.naam = document.getElementById("naam").value;
	account.telefoon = document.getElementById("telefoon").value;
	account.plaats = document.getElementById("plaats").value;
	account.postcode = document.getElementById("postcode").value;

	let accountJSON = JSON.stringify(account);
	console.log(accountJSON);
	fetch(`http://localhost:8082/account/${userID}`, {
		method: "PUT",
		body: accountJSON,
		headers: { "Content-Type": "application/json" },
	})
		.then((r) => r.json(r))
		.then((d) => console.log(d));
}
