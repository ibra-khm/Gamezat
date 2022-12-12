import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export const ProductContext = createContext();

export function ProductProvider({ children }) {


	const [products, setProducts] = useState();
	useEffect(() => {
		axios.get("/api/products").then((response) => {
			setProducts(response.data.data);
		});
	}, []);

	return (
		<>
			<ProductContext.Provider
				value={{
					products

				}}
			>
				{children}
			</ProductContext.Provider>
		</>
	);
}
