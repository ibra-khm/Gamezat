import { Table } from "flowbite-react";
import React, { useContext, useState } from "react";
import { AdminContext } from "../../../context/AdminContext";
import ProductModal from "./ProductModal";

export default function ProductTable() {
	const { allProducts, delProduct, setProductErrors, setProductEditErrors } =
		useContext(AdminContext);
	const [show, setShow] = useState(false);
	const [productToEdit, setProductToEdit] = useState({});

	const onClose = () => {
		setShow(false);
		setProductEditErrors([]);
	};

	const handleEdit = (product) => {
		setProductToEdit(product);
		setShow(true);
	};
	return (
		<div className="w-full">
			<ProductModal show={show} onClose={onClose} product={productToEdit} />
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>Product name</Table.HeadCell>
					<Table.HeadCell>Description</Table.HeadCell>
					<Table.HeadCell>Link</Table.HeadCell>
					<Table.HeadCell>Price</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Edit</span>
					</Table.HeadCell>
					<Table.HeadCell>
						<span className="sr-only">Delete</span>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{allProducts?.map((product, i) => {
						return (
							<>
								<Table.Row
									key={i}
									className="bg-white dark:border-gray-700 dark:bg-gray-800"
								>
									<Table.Cell className="whitespace-nowrap flex items-center gap-2 font-medium text-gray-900 dark:text-white">
										<img
											class="w-10 h-10 rounded-full"
											src={product.image}
											alt=""
										/>{" "}
										{product.name}
									</Table.Cell>
									<Table.Cell>{product.description}</Table.Cell>
									<Table.Cell>
										<a href={product.link} target="_blank">
											Go To Product
										</a>
									</Table.Cell>
									<Table.Cell>{product.price}</Table.Cell>
									<Table.Cell>
										<button
											onClick={() => handleEdit(product)}
											className="font-medium text-blue-600 hover:underline dark:text-blue-500"
										>
											Edit
										</button>
									</Table.Cell>
									<Table.Cell>
										<button
											onClick={() => delProduct(product.id)}
											className="font-medium text-amber hover:underline dark:text-amber"
										>
											Delete
										</button>
									</Table.Cell>
								</Table.Row>
							</>
						);
					})}
				</Table.Body>
			</Table>
		</div>
	);
}
