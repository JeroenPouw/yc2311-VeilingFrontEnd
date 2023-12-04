# Veilingsite Front End

FrontEnd layer van de Veiling opdracht voor YC2311

## Structuur

- `.html` files in root directory with clear names
- `.css` files in css folder (same name as html page they apply to)
- `.js` files in js folder (same name as html page they apply to)
- `.jpg`, `.png` etc in images folder

## Linking to Bootstrap + own JS/CSS files in html

Do this inside head, after `<title>` tag:

```html
<!-- link to bootstrap css -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
	crossorigin="anonymous"
/>
<!-- link to own css file -->
<link href="css/accounts.css" rel="stylesheet" />

<!-- link to bootstrap js -->
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
	crossorigin="anonymous"
></script>

<!-- link to own js file -->
<script src="js/accounts.js"></script>

<!-- link to jquery nav bar -->
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="js/nav.js"></script>
```

## Bootstrap

https://getbootstrap.com/docs/5.3/
