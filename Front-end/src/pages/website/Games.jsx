import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addCurrentGame, fetchGames } from "../../reducers/gameSlice";
import { BiDesktop, BiMobile, BiPhone, BiTab } from "react-icons/bi";
import Sort from "../../components/website/games/Sort";
import { Link } from "react-router-dom";
import { Pagination } from "flowbite-react";
import { Input } from "@material-tailwind/react";
// import games from "../../games.json";

export default function Games() {
	const dispatch = useDispatch();
	const games = useSelector((state) => state.games.games);
	const loading = useSelector((state) => state.games.loading);
	const [items, setItems] = useState([]);
	// useEffect(() => {
	// 	setItems(games);
	// }, [games]);
	// const [page, setPage] = useState(1);
	const [filterCateg, setFilterCateg] = useState({ other: false, puzzles: false, sports: false, racing: false, shooters: false, adventures: false, girls: false, strategy: false });
	const [filteredItems, setFilteredItems] = useState([]);
	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [nPages, setNPages] = useState(1);
	const [recordsPerPage, setRecordsPerPage] = useState(12);
	// const [indexOfLastRecord, setIndexOfLastRecord] = useState()
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	// const indexOfFirstRecord = indexOfLastRecord - recordsPerPage < 0 ? 0 : indexOfLastRecord - recordsPerPage;
	const [search, setSearch] = useState('')

	useEffect(() => {

		// items?.length - ((currentPage - 1) * recordsPerPage) < recordsPerPage ? setIndexOfLastRecord(items?.length) : setIndexOfLastRecord(recordsPerPage * currentPage)
		const num = Math.ceil(games?.length / recordsPerPage);
		if (num) {
			num <= 1 ? setNPages(1) : setNPages(num)
		}
		// setItems(games?.slice(indexOfFirstRecord, indexOfLastRecord))
	}, [games, currentPage, recordsPerPage])




	useEffect(() => {
		console.log(search);
	}, [search])



	// Pagination
	useEffect(() => {
		dispatch(fetchGames());
	}, [dispatch]);





	useEffect(() => {
		if (search === "") {

			console.log(checkForFilters());
			if (checkForFilters()) {
				const categories = games.map(game => game.category);
				// Create an array of categories with a true value in the filterCateg object
				const validCategories = categories.filter(category => filterCateg[category]);
				const validGames = games.filter(game => validCategories.includes(game.category));
				setItems(validGames)

			} else {
				console.log("hhhhhhhhhhhhhhh");
				// setFilteredItems(games)
				setItems(games?.slice(indexOfFirstRecord, indexOfLastRecord))
			}
		} else {
			const puzzles = games.filter(game => (game.title.toLowerCase()).includes(search.toLowerCase()));
			setItems(puzzles)
		}
	}, [filterCateg, games, currentPage, recordsPerPage, search]);


	function checkForFilters() {
		if (filterCateg.adventures ||
			filterCateg.girls ||
			filterCateg.other ||
			filterCateg.puzzles ||
			filterCateg.racing ||
			filterCateg.shooters ||
			filterCateg.sports ||
			filterCateg.strategy

		) {
			return true
		} else {

			return false
		}
	}


	return (
		<div className="   flex justify-center">

			<Sort setSearch={setSearch} setFilter={setFilterCateg} filter={filterCateg} games={games} />
			<div className="max-w-2xl w-full px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

					{
						items.length === 0 ? <p className="text-3xl text-center">No Games</p>
							: items?.map((game, i) => {
								return (
									<Link
										to={`/games/${game.guid}`}
										key={i}
										className="group"
									>
										<div className="relative dark:text-cream  aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
											<img
												src={game.thumb}
												alt=""
												className="h-full w-full object-cover object-center group-hover:opacity-75"
											/>
											<div className="absolute top-2 right-2 shadow-md bg-indigo rounded-lg p-1">
												{/* <BsFillPhoneFill size={25} className={"text-lemon"} /> */}
												{game.width <= 480 ? (
													<BiMobile size={25} className={"text-lemon"} />
												) : game.width <= 768 ? (
													<BiTab size={25} className={"text-lemon"} />
												) : (
													<BiDesktop size={25} className={"text-lemon"} />
												)}
											</div>
										</div>
										<h3 className="mt-4 text-sm text-gray-700">{game.title}</h3>
										{/* <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
									</Link>
								);
							})}
					{
						checkForFilters() || search !== "" ? null :
							<>
								<Pagination
									className=""
									currentPage={currentPage}
									totalPages={nPages}
									onPageChange={(e) => setCurrentPage(e)}
								/>
							</>
					}
				</div>
			</div>
		</div>
	);
}