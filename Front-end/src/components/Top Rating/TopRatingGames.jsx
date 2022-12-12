import React, { useRef, useState, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
import { FreeGamesContext } from "../../context/FreeGamesContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../../reducers/gameSlice";
import { Link } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
// import required modules

export default function TopRatingGames() {
	const dispatch = useDispatch();
	const [topRatings, setTopRatings] = useState([]);
	const [topRatedGames, setTopRatedGames] = useState([]);
	const games = useSelector((state) => state.games.games);

	useEffect(() => {
		dispatch(fetchGames());
	}, [dispatch]);

	useEffect(() => {
		axios.get("/api/toprated").then((res) => {
			if (res.data.status === 200) {
				console.log("----------------");
				console.log(res);
				console.log("----------------");
				setTopRatings(res.data.top_rated);
			}
		});
	}, []);

	useEffect(() => {
		const topGames = topRatings?.map((top) => {
			return games?.find((game) => game.guid == top.game_id);
		});
		setTopRatedGames(topGames);
	}, [topRatings]);

	return (
		<>
			<div className="flex justify-around flex-wrap  p-10 rounded-3xl border-t-4 shadow-lg w-[95%] mx-auto border-amber  dark:bg-slate-800 ">
				<Swiper
					breakpoints={{
						"@0.00": {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						"@0.75": {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						"@1.00": {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						"@1.50": {
							slidesPerView: 4,
							spaceBetween: 20,
						},
					}}
					slidesPerGroup={1}
					loop={true}
					loopFillGroupWithBlank={true}
					navigation={true}
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Pagination, Navigation, Keyboard, Autoplay]}
					keyboard={{
						enabled: true,
					}}
					className="mySwiper flex justify-center "
				>
					{
						topRatedGames.length === 0 ? <p className="text-3xl text-center">No Games</p>

							: topRatedGames?.map((game) => {
								return (
									<SwiperSlide className="mx-5 drop-shadow-md">
										<Link
											key={game.id}
											to={`/games/${game?.guid}`}
											class="group relative block bg-black w-72 h-72 mb-10 shadow-xl "
										>
											<img
												alt="Developer"
												src={game.thumb}
												class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
											/>

											<div class="relative p-4 flex  justify-between">
												<p class="text-xl font-bold text-white">{game.title}</p>

												<p class="text-md text-white flex items-center">
													<AiTwotoneStar size={35} className="text-lemon" />{" "}
													{topRatings?.map((rating) => {
														if (rating.game_id === game?.guid) {
															return Number(rating.avg_rating).toFixed(1);
														}
													})}{" "}
												</p>
											</div>
										</Link>
									</SwiperSlide>
								);
							})}
				</Swiper>
			</div>
		</>
	);
}
