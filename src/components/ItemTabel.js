import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ItemOffcanvas from "./ItemOffcanvas";

export default function ItemTabel({ data }) {
	const renderTableCell = (value) => {
		console.log(value);
		// Check if the value is an object, if so, stringify it
		if (typeof value === "object") {
			if (Array.isArray(value)) {
				// If it's an array, return its length
				if (value[0].url) {
					console.log("foto");
				}
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
					<th>Actions</th>
					{/* {data.length > 0 &&
						Object.keys(data[0]).map((item, index) => (
							<th key={index}>{item}</th>
						))} */}
					<th>ID</th>
					<th>Veilingen</th>
					<th>Naam</th>
					<th>Categorie</th>
					<th>Productie datum</th>
					<th>Beschrijving</th>
					<th>Gewicht</th>
					<th>Breedte</th>
					<th>Lengte</th>
					<th>Hoogte</th>
					<th>Fotos</th>
					<th></th>
					<th>Aanbieder</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, rowIndex) => (
					<tr key={rowIndex}>
						<td>
							<ItemOffcanvas item={item} />
						</td>
						{Object.values(item).map((elem, colIndex) => (
							<td key={colIndex}>{renderTableCell(elem)}</td>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	);
}
