import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function AdminPortal({ children }) {
	return (
		<Container>
			<h1 className="text-center mt-3">Admin portal</h1>
			<Outlet />
		</Container>
	);
}
