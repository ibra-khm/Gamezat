import React from "react";
import { AiFillShopping } from "react-icons/ai";
import { IoBagAdd, IoBagAddOutline } from "react-icons/io5";
import ProductForm from "../../components/dashboard/products/ProductForm";
import ProductTable from "../../components/dashboard/products/ProductTable";

export default function DProducts() {
	return (
		<>
			<div className="flex flex-wrap gap-10 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-indigo  dark:bg-slate-800">
				<span className="flex items-center gap-5">
					{" "}
					<IoBagAdd size={25} className="text-indigo" /> Add an affiliate
					product
				</span>
				<ProductForm />
			</div>
			<div className="flex flex-wrap gap-10 m-9 p-10 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800">
				<span className="flex items-center gap-5">
					{" "}
					<AiFillShopping size={25} className="text-amber" /> Affilliate
					products
				</span>
				<ProductTable />
			</div>
		</>
	);
}
