function openHomepage(params) {
	window.location = `persoonlijke-homepage.html?accountid=${params}`;
}

function maakAccount() {
	let account = {};

	account.email = document.getElementById("email").value;
	account.password = document.getElementById("password").value;
	account.naam = document.getElementById("naam").value;
	account.telefoon = document.getElementById("telefoon").value;
	account.plaats = document.getElementById("plaats").value;
	account.postcode = document.getElementById("postcode").value;

	let accountJSON = JSON.stringify(account);
	console.log(accountJSON);
	fetch("http://localhost:8082/maak-account", {
		method: "POST",
		body: accountJSON,
		headers: { "Content-Type": "application/json" },
	})
		.then((r) => r.json(r))
		.then((d) => openHomepage(d.id));
}
