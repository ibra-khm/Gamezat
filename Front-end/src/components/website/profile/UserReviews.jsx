import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AiTwotoneStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function UserReviews() {
	const { user, token } = useContext(AuthContext);
	const [reviews, setReviews] = useState();

	useEffect(() => {
		axios
			.get("/api/userreviews", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setReviews(res.data.reviews);
				}
			});
	}, [token]);

	const starFunction = (stars) => {
		let starsArr = [];
		for (let i = 0; i < stars; i++) {
			starsArr.push(<AiTwotoneStar className="text-lemon" />);
		}
		for (let index = 0; index < 5 - stars; index++) {
			starsArr.push(<AiTwotoneStar className="text-lightGray" />);
		}
		return starsArr;
	};

	return (
		<>
			{reviews?.length > 0 ? (
				reviews?.map((review) => {
					return (
						<article className="rounded-xl border-2 border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-600 shadow-md max-h-40 relative">
							<div className="flex items-start p-6">
								<div className="flex flex-col gap-2 shrink-0 items-center">
									<img
										alt=""
										src={user.image}
										className="h-14 w-14 rounded-lg object-cover"
										referrerPolicy="no-referrer"
									/>
								</div>

								<div className="ml-4 space-y-2 text-start">
									<Link
										to={`/games/${review?.game_id}`}
										className="block text-xs text-gray-500 dark:text-gray-400 font-medium  hover:text-gray-700 capitalize"
									>
										Game: {review?.game_id.replace(/-/g, " ")}
									</Link>
									<h3 className="font-medium sm:text-lg w-fit">
										<div className="flex">
											{starFunction(review?.stars).map((i) => {
												return i;
											})}
										</div>
									</h3>

									<p className="text-sm text-gray-700 dark:text-cream pl-2">{review?.review}</p>

									<div className="mt-2 flex items-center sm:gap-2">
										<div className="flex items-center text-gray-500 dark:text-gray-400">
											<BiTime />
											<p className="ml-1 text-xs">
												{review?.created_at.split("T")[0]}
											</p>
										</div>

										<span className="block " aria-hidden="true">
											&middot;
										</span>

										<p className="block text-xs text-gray-500 dark:text-gray-400">
											Reviewed by{" "}
											<span className="font-medium  hover:text-gray-700 dark:hover:text-gray-300">
												{user.name}
											</span>
										</p>
									</div>
								</div>
							</div>
						</article>
					);
				})
			) : 
				<div className="text-center mx-auto dark:text-cream">No reviews</div>
			}
		</>
	);
}
