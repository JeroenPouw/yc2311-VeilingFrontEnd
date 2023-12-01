var userID;

function getAccount(accountID) {
	fetch(`http://localhost:8082/account/${accountID}`)
		.then((r) => r.json(r))
		.then((d) => toonNaam(d));
}

function getItems() {
	fetch(`http://localhost:8082/veilingstukken`)
		.then((r) => r.json(r))
		.then((d) => toonVeilingstukken(d));
}

window.onload = function () {
	const url_string = window.location.href; // www.test.com?filename=test
	const url = new URL(url_string);
	const accountID = url.searchParams.get("accountid");
	userID = accountID;
	getAccount(accountID);
	getItems();
};

function toonNaam(data) {
	const container = document.getElementById("accountDetails");
	const h1 = document.createElement("h1");
	h1.innerText = data.naam;
	console.log(data);
	container.appendChild(h1);
}

function favorietToevoegen(params) {
	console.log(params);
	console.log(userID);
	fetch(`http://localhost:8082/account/${userID}/veilingstuk/${params}`);
}

function toonVeilingstukken(data) {
	const container = document.getElementById("item-container");

	data.forEach((item) => {
		// create card + add classes
		const card = document.createElement("div");
		card.classList.add("card", "m-1");

		// create card body + add classes
		const cardBody = document.createElement("div");
		cardBody.classList.add("card-body");

		// create title + button div
		const row = document.createElement("div");
		row.classList.add("row", "justify-content-between");

		// create columns
		const colTitle = document.createElement("div");
		colTitle.classList.add("col-9");
		const colButton = document.createElement("div");
		colButton.classList.add("col", "text-end");

		// create card title
		const cardTitle = document.createElement("h5");
		cardTitle.classList.add("card-title");
		cardTitle.innerText = item.naam;

		// create card subtitle
		const cardSubtitle = document.createElement("h6");
		cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
		cardSubtitle.innerText = item.categorie;

		// create card text
		const cardText = document.createElement("p");
		cardText.classList.add("card-text");
		cardText.innerText = item.beschrijving;

		// create button to add to favourites
		const button = document.createElement("button");
		button.addEventListener("click", function () {
			favorietToevoegen(item.id);
		});
		button.classList.add("btn", "btn-danger", "ml-auto");
		button.innerText = "♡";

		// append all items to page
		container.appendChild(card);
		row.appendChild(colTitle);
		row.appendChild(colButton);
		cardBody.appendChild(row);
		colTitle.appendChild(cardTitle);
		colTitle.appendChild(cardSubtitle);
		colButton.appendChild(button);
		card.appendChild(cardBody);
		cardBody.appendChild(cardText);

		console.log(item);
	});
}

{
	/* <div class="card col-5">
	<div class="card-body">
		<h5 class="card-title">Card title</h5>
		<h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
		<p class="card-text">
			Some quick example text to build on the card title and make up the bulk of
			the card's content.
		</p>
		<a href="#" class="card-link">
			Card link
		</a>
		<a href="#" class="card-link">
			Another link
		</a>
	</div>
</div>; */
}
