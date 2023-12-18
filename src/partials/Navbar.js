import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

export default function TopNav() {
	return (
		<Navbar
			bg="dark"
			data-bs-theme="dark"
			expand="lg"
			className="bg-body-tertiary"
		>
			<Container>
				<Navbar.Brand href="/">Veilingsite</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to={"/"}>
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to={"/veilingen"}>
							<Nav.Link>Veilingen</Nav.Link>
						</LinkContainer>

						<NavDropdown title="Admin" id="basic-nav-dropdown" align="start">
							<LinkContainer to={"/admin/items"}>
								<NavDropdown.Item>Items</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to={"/admin/veilingen"}>
								<NavDropdown.Item>Veilingen</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to={"/admin/accounts"}>
								<NavDropdown.Item>Accounts</NavDropdown.Item>
							</LinkContainer>
						</NavDropdown>
					</Nav>
					<Nav className="ms-auto">
						<NavDropdown title="Account" id="basic-nav-dropdown" align="end">
							<LinkContainer to={"/inloggen"}>
								<NavDropdown.Item>Inloggen</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to={"/registreren"}>
								<NavDropdown.Item>Registreren</NavDropdown.Item>
							</LinkContainer>
							<NavDropdown.Divider />
							<LinkContainer to={"/profiel"} state={{ id: 4 }}>
								<NavDropdown.Item>Mijn profiel</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to={"/"} state={{ id: 4 }}>
								<NavDropdown.Item>Mijn homepage</NavDropdown.Item>
							</LinkContainer>
							<NavDropdown.Item href="#">Uitloggen</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
