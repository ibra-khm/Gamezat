import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { BiDesktop, BiMobile, BiTab } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGames } from "../../reducers/gameSlice";

export default function SingleFavoriteGames({ setFavCount, user }) {
	const dispatch = useDispatch();
	const games = useSelector((state) => state.games.games);
	const [favorites, setFavorites] = useState([]);
	useEffect(() => {
		dispatch(fetchGames());
	}, [dispatch]);
	useEffect(() => {
		const favGames = user?.favorites?.map((fav) => {
			return games?.find((game) => game.guid === fav.game_id);
		});
		console.log("kmsvdngkdn");
		console.log(user?.favorites);
		setFavorites(favGames);
		if (user?.favorites) {
			setFavCount(user?.favorites.length);
		} else {
			setFavCount(0);
		}
		console.log(favorites);
	}, [user]);
	return (
		<>
			{favorites?.length > 0 ? (
				favorites?.map((game, i) => {
					return (
						<Link to={`/games/${game?.guid}`} key={i} className="group">
							<div className="relative  aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
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
				})
			) : (
				<div className="text-center">User didn't add any games yet!</div>
			)}
		</>
	);
}
