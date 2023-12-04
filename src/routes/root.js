import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../partials/Navbar";
import Footer from "../partials/Footer";

export default function Root() {
	return (
		<div className="m-0">
			<TopNav />
			<div className="mb-5">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
