import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Row, Col, Navbar } from "react-bootstrap";

export default function Footer() {
	return (
		<Navbar fixed="bottom" bg="dark" data-bs-theme="dark">
			<Container>
				<Row className="justify-content-center w-100">
					<Col xs="auto">
						<a
							href="https://github.com/JeroenPouw/yc2311-VeilingFrontEnd"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://seeklogo.com/images/J/javascript-logo-8892AEFCAC-seeklogo.com.png"
								width="30"
								height="30"
								alt="Javascript"
							/>
						</a>
					</Col>
					<Col xs="auto">
						<a
							href="https://github.com/Eloise-es/veiling-java-YC2311"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/java-colored.svg"
								width="30"
								height="30"
								alt="Java"
							/>
						</a>
					</Col>
					<Col xs="auto">
						<a
							href="https://github.com/Sevillio/YCVeiling202311new"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/csharp-colored.svg"
								width="30"
								height="30"
								alt="C#"
							/>
						</a>
					</Col>
				</Row>
			</Container>
		</Navbar>
	);
}
