import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ItemForm from "./ItemForm";
import VeilingForm from "./VeilingForm";
import VeilingFormCards from "./VeilingFormCards";
import ImageUploader from "./ImageUploader";

export default function ItemOffcanvas({ item }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleButtonClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		handleShow();
		console.log(item);
	};

	const handleCardClick = (e) => {
		e.stopPropagation();
	};

	return (
		<>
			<Button
				variant="secondary"
				onClick={handleButtonClick}
				className="ml-auto"
			>
				✎
			</Button>

			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Item details</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ItemForm veilingstuk={item} />
					<ImageUploader item={item} />
					{item.veilingen.length == 0 ? (
						<VeilingForm item={item} />
					) : (
						<VeilingFormCards veilingen={item.veilingen} />
					)}
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
}
