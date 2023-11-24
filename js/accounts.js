function getAccounts() {
	fetch("http://localhost:8082/alle-accounts")
		.then((r) => r.json(r))
		.then((d) => maakTable(d));
}

getAccounts();

function toevoegen() {
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
	});
	getAccounts();
}

// Function to convert JSON data to HTML table
function maakTable(data) {
	console.log(data);

	// Create the table element
	let table = document.getElementById("table");
	table.innerHTML = "";

	// Get the keys (column names) of the first object in the JSON data
	let cols = Object.keys(data[0]);

	// Create the header element
	let thead = document.createElement("thead");
	let tr = document.createElement("tr");

	// Loop through the column names and create header cells
	cols.forEach((item) => {
		let th = document.createElement("th");
		th.innerText = item; // Set the column name as the text of the header cell
		tr.appendChild(th); // Append the header cell to the header row
	});
	thead.appendChild(tr); // Append the header row to the header
	table.append(tr); // Append the header to the table

	// Loop through the JSON data and create table rows
	data.forEach((item) => {
		let tr = document.createElement("tr");

		// Get the values of the current object in the JSON data
		let vals = Object.values(item);

		// Loop through the values and create table cells
		vals.forEach((elem) => {
			let td = document.createElement("td");
			td.innerText = elem; // Set the value as the text of the table cell
			tr.appendChild(td); // Append the table cell to the table row
		});
		table.appendChild(tr); // Append the table row to the table
	});

	// container.appendChild(table); // Append the table to the container element
}
