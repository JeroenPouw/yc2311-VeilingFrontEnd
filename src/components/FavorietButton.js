import { backendURL } from "js/Backend";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function FavorietButton({ accountID, itemID, isFav }) {
	const [isFavoriet, setIsFavoriet] = useState(isFav);
	const [isClicked, setIsClicked] = useState(false);

	async function toggleFavoriet(accountID, itemID, isFavoriet) {
		if (!isClicked) {
			setIsClicked(true);
			if (isFavoriet == true) {
				// remove from favourites
				try {
					const response = await fetch(
						`${backendURL}/account/${accountID}/veilingstuk/${itemID}`,
						{
							method: "DELETE",
						}
					);
					if (response.ok) {
						setIsFavoriet(false);
					} else {
						// Handle error cases here
						console.error("Verwijderen uit favorieten mislukt.");
					}
				} catch (error) {
					console.error("Fout bij verwijderen uit favorieten: ", error);
				}
			} else {
				// add to favourites
				try {
					const response = await fetch(
						`${backendURL}/account/${accountID}/veilingstuk/${itemID}`
					);
					if (response.ok) {
						setIsFavoriet(true);
					} else {
						// Handle error cases here
						console.error("Toevoegen aan favorieten mislukt");
					}
				} catch (error) {
					console.error("Fout bij toevoegen aan favorieten: ", error);
				}
			}
		}
		setIsClicked(false);
	}
	return (
		<Button
			variant={isFavoriet ? "danger" : "primary"}
			className="ml-auto"
			onClick={(e) => {
				e.stopPropagation();
				{
					toggleFavoriet(accountID, itemID, isFavoriet);
				}
			}}
			disabled={isClicked}
		>
			♡
		</Button>
	);
}
