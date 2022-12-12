import { Button } from "flowbite-react";
import React, { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";

export default function ProductForm() {
	const { addProduct, product, handleInput } = useContext(AdminContext);

	return (
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
						onChange={handleInput}
						value={product?.name}
						placeholder=""
					/>
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
						onChange={handleInput}
						value={product?.price}
						placeholder=""
					/>
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
						value={product?.description}
						onChange={handleInput}
						placeholder=""
					/>
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
						value={product?.link}
						onChange={handleInput}
						placeholder=""
					/>
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
						value={product?.image}
						onChange={handleInput}
						type="url"
						placeholder=""
					/>
				</div>
			</div>
			<div class="flex justify-center w-full -mx-3 mb-2">
				<Button
					color="gray"
					className="w-9/12"
					onClick={() => addProduct(product)}
				>
					Add
				</Button>
			</div>
		</form>
	);
}
