import React from "react";
import { TailSpin } from "react-loader-spinner";

export default function Spinner() {
	return (
		<div className="mt-5 d-flex justify-content-center align-items-center">
			<TailSpin
				visible={true}
				height="80"
				width="80"
				color="black"
				ariaLabel="tail-spin-loading"
				radius="1"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	);
}
