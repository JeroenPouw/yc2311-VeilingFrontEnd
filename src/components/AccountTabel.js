import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AccountOffcanvas from "../components/AccountOffcanvas";

export default function AccountTabel({ data }) {
	const navigate = useNavigate();
	const openHomepage = (userID) => {
		if (userID) {
			navigate(`/persoonlijke-homepage`, {
				state: { id: userID },
			});
		} else {
			// inloggegevens niet gevonden;
		}
	};
	const renderTableCell = (value) => {
		// Check if the value is an object, if so, stringify it
		if (typeof value === "object") {
			if (Array.isArray(value)) {
				// If it's an array, return its length
				return value.length;
			} else {
				return JSON.stringify(value);
			}
		}

		return value;
	};

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{/* {data.length > 0 &&
						Object.keys(data[0]).map((item, index) => (
							<th key={index}>{item}</th>
						))} */}
					<th>Actions</th>
					<th>ID</th>
					<th>Favorieten</th>
					<th>Aangeboden</th>
					<th>Email</th>
					<th>Password</th>
					<th>Naam</th>
					<th>Telefoon</th>
					<th>Plaats</th>
					<th>Postcode</th>
				</tr>
			</thead>
			<tbody>
				{data.map((acc, rowIndex) => (
					<tr key={rowIndex}>
						<td>
							<AccountOffcanvas account={acc} />
						</td>
						{Object.values(acc).map((elem, colIndex) => (
							<td key={colIndex}>{renderTableCell(elem)}</td>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	);
}
