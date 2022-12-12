import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchGames, fetchReviews } from "../../reducers/gameSlice";
import ReviewCard from "../../components/website/singlegame/ReviewCard";
import AddReview from "../../components/website/singlegame/AddReview";
import { Rating } from "flowbite-react";
import { TbMessageReport } from "react-icons/tb";
import { HiHeart } from "react-icons/hi";
import ReportModal from "../../components/website/singlegame/ReportModal";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import swal from "sweetalert";

export default function SingleGame() {
	const dispatch = useDispatch();
	// Get game id from url
	const { id } = useParams();
	// Get user info
	const { token, user, getUserInfo, setShowPortal } = useContext(AuthContext);
	// state to show or hide report modal
	const [show, setShow] = useState(false);
	// state to save if the user has the game in favorites
	const [isFav, setIsFav] = useState(false);
	// Get game info from redux
	const games = useSelector((state) => state.games.games);
	const game = games?.find((game) => game.guid === id);
	const reviews = useSelector((state) => state.games.reviews);

	// Find out if the game is favorited by user
	useEffect(() => {
		const fav = user.favorites?.find((fav) => fav.game_id === game.guid);
		if (fav != null) {
			setIsFav(true);
		} else {
			setIsFav(false);
		}
		console.log("fav");
		console.log(fav);
		console.log(isFav);
	}, [user]);

	// close report model
	const closeModal = () => {
		setShow(false);
	};

	// fetch data from api using axios / thunk
	useEffect(() => {
		dispatch(fetchGames());
		dispatch(fetchReviews(id));
	}, [dispatch]);

	// add/remove game to favorite
	const addToFav = () => {
		if (token) {
			if (!isFav) {
				const data = {
					game_id: game.guid,
				};
				axios
					.post("/api/favorites", data, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						console.log(res);
						setIsFav(true);
						getUserInfo();
						swal("Thank you!", `Game added to your favorites!`, "success");
					});
			} else {
				const fav = user.favorites?.find((fav) => fav.game_id === game.guid);
				axios
					.delete(`/api/favorites/${fav.id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						setIsFav(false);
						getUserInfo();
						swal({
							title: "We are sorry!",
							text: `Game removed from your favorites!`,
							icon: "error",
						});
					});
			}
		} else {
			setShowPortal(true);
		}
	};

	return (
		<>
			<div className="fixed right-6 bottom-6">
				<button
					type="button"
					className={`flex ring-1 ring-amber justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400 `}
					onClick={addToFav}
				>
					<HiHeart size={30} color={isFav ? "#D72323" : ""} />
					<span className="sr-only">Share</span>
				</button>
			</div>
			<ReportModal show={show} closeModal={closeModal} game={game} />
			<div className="flex flex-col items-center p-5">
				<div className="overflow-hidden mt-16">
					<iframe
						height={game?.height}
						src={game?.link}
						className={" w-[95vw] h-[85vh]"}
					></iframe>
				</div>
				<div className="w-full lg:w-9/12 m-9 p-10 space-y-5 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800">
					<div className="flex justify-between">
						<Rating>
							<Rating.Star />
							<p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
								{reviews?.averageRating?.toFixed(2)}
							</p>
							<span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
							<p className="text-sm font-medium text-gray-900 underline dark:text-white">
								{reviews?.count} reviews
							</p>
						</Rating>
						{token ? (
							<div
								onClick={() => setShow(true)}
								className="flex text-sm hover:cursor-pointer hover:underline"
							>
								Report game{" "}
								<TbMessageReport size={20} className="text-amber " />
							</div>
						) : (
							""
						)}
					</div>
					{reviews?.count === 0 ? (
						""
					) : (
						<div
							className="shadow-lg rounded-lg p-5 ring-1 ring-lightGray grid grid-cols-1 xl:grid-cols-2 gap-5 h-72 overflow-auto scrollbar-hide
"
						>
							{reviews.reviews?.map((review, i) => {
								return <ReviewCard key={i} review={review} />;
							})}
						</div>
					)}
					<AddReview id={id} />
				</div>
			</div>
		</>
	);
}
