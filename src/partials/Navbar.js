import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../js/AuthContext"; // Import useAuth hook

export default function TopNav() {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const navigate = useNavigate();

	const uitloggen = () => {
		localStorage.removeItem("userToken");
		setIsLoggedIn(false);
		navigate(`/`);
	};

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
						{isLoggedIn && (
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
						)}
					</Nav>
					<Nav className="ms-auto">
						<NavDropdown title="Account" id="basic-nav-dropdown" align="end">
							{isLoggedIn ? (
								<>
									<LinkContainer to={"/profiel"} state={{ id: 4 }}>
										<NavDropdown.Item>Mijn profiel</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to={"/"} state={{ id: 4 }}>
										<NavDropdown.Item>Mijn homepage</NavDropdown.Item>
									</LinkContainer>{" "}
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={uitloggen} href="/">
										Uitloggen
									</NavDropdown.Item>
								</>
							) : (
								<>
									<LinkContainer to={"/inloggen"}>
										<NavDropdown.Item>Inloggen</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to={"/registreren"}>
										<NavDropdown.Item>Registreren</NavDropdown.Item>
									</LinkContainer>
								</>
							)}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
