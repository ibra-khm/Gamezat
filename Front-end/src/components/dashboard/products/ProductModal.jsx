import { Button, Modal } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/AdminContext";

export default function ProductModal({ show, onClose, product }) {
	const { editProduct, productEditErrors } = useContext(AdminContext);

	const [productEdit, setProductEdit] = useState({
		name: "",
		description: "",
		image: "",
		link: "",
		price: "",
	});

	useEffect(() => {
		setProductEdit({
			name: product?.name,
			description: product?.description,
			image: product?.image,
			link: product?.link,
			price: product?.price,
		});
	}, [product]);

	const handleEditInput = (e) => {
		setProductEdit({ ...productEdit, [e.target.name]: e.target.value });
	};
	return (
		<React.Fragment>
			<Modal show={show} onClose={onClose}>
				<Modal.Header>Edit Product</Modal.Header>
				<Modal.Body>
					<form class="w-full">
						<div class="flex flex-wrap -mx-3 mb-6">
							<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-first-name"
								>
									Name
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
									id="grid-first-name"
									type="text"
									name="name"
									onChange={handleEditInput}
									defaultValue={product?.name}
									placeholder=""
								/>
								<small className="text-amber">{productEditErrors?.name}</small>
							</div>
							<div class="w-full md:w-1/2 px-3">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-last-name"
								>
									Price
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-last-name"
									type="text"
									name="price"
									onChange={handleEditInput}
									defaultValue={product?.price}
									placeholder=""
								/>
								<small className="text-amber">{productEditErrors?.price}</small>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-2">
							<div class="w-full px-3">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-password"
								>
									Description
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-password"
									type="text"
									name="description"
									defaultValue={product?.description}
									onChange={handleEditInput}
									placeholder=""
								/>
								<small className="text-amber">
									{productEditErrors?.description}
								</small>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-2">
							<div class="w-full  px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-city"
								>
									Link
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-city"
									type="url"
									name="link"
									defaultValue={product?.link}
									onChange={handleEditInput}
									placeholder=""
								/>
								<small className="text-amber">{productEditErrors?.link}</small>
							</div>
						</div>
						<div class="flex flex-wrap -mx-3 mb-5">
							<div class="w-full px-3 mb-6 md:mb-0">
								<label
									class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									for="grid-image"
								>
									Image
								</label>
								<input
									class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
									id="grid-image"
									name="image"
									defaultValue={product?.image}
									onChange={handleEditInput}
									type="url"
									placeholder=""
								/>
								<small className="text-amber">{productEditErrors?.image}</small>
							</div>
						</div>
						<div class="flex justify-center w-full -mx-3 mb-2">
							<Button
								color="gray"
								className="w-9/12"
								onClick={() => editProduct(productEdit, product?.id)}
							>
								Edit
							</Button>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}
