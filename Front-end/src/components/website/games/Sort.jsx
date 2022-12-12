import { Input, Switch } from "@material-tailwind/react";
import React from "react";

export default function Sort({ games, setSearchInput, filter, setFilter, setSearch }) {
	const allCategories = games?.reduce((acc, game) => {
		acc.push(game.category);
		return acc;
	}, []);
	const categories = [...new Set(allCategories)];
	// console.log(categories);
	categories.reverse();
	const colors = [
		"blue",
		"red",
		"green",
		"lime",
		"teal",
		"orange",
		"purple",
		"pink",
	];
	// console.log(categories);
	return (
		<div className="  dark:text-cream  w-52 h-screen sticky top-0 flex flex-col gap-5 capitalize justify-center p-2 mt-24  rounded-3xl rounded-tl-none border-t-4 shadow-lg border-amber ">


			<div class="relative">
				<input onChange={(e) => { setSearch(e.target.value) }} type="text" id="floating_outlined" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Search " />
				{/* <label for="floating_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Search</label> */}
			</div>

			{categories?.map((category, i) => {

				return (
					<div className="dark:text-cream">
						<Switch onChange={(e) => setFilter({ ...filter, [e.target.name]: e.target.checked })
						} name={category} color={colors[i]} key={i} id={category} label={category} className='dark:text-cream' />
					</div>
				);
			})}
		</div>
	);
}
