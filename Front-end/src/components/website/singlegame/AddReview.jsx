import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useContext, useState } from "react";

import { useDispatch } from "react-redux";
import { addReview, updateReviews } from "../../../reducers/gameSlice";
import { AuthContext } from "../../../context/AuthContext";

export default function AddReview({ id }) {
	const { user, token, setShowPortal } = useContext(AuthContext);
	const dispatch = useDispatch();
	const [ratingValue, setRatingValue] = useState(5);
	const [review, setReview] = useState("");
	const [enableButton, setEnableButton] = useState(false);
	const [errors, setErrors] = useState();
	const ratingChanged = (newRating) => {
		setRatingValue(newRating);
	};

	const handleInput = (e) => {
		setReview(e.target.value);
		if (e.target.value.replace(/ /g, "") != "") {
			setEnableButton(true);
		} else {
			setEnableButton(false);
		}
	};

	const handleReview = () => {
		if (token) {
			const data = {
				stars: ratingValue,
				user_id: user.id,
				game_id: id,
				review: review,
			};
			axios
				.post("/api/reviews", data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						console.log(res);
						dispatch(updateReviews(res.data));
						setReview("");
					} else {
						console.log(res);
						setErrors(res.data.errors);
					}
				});
		} else {
			setShowPortal(true);
		}
	};

	return (
		<div className="shadow-lg rounded-lg p-5 mt-10">
			<label
				htmlFor="message"
				className="block mb-2 text-md font-medium text-darkGray dark:text-white"
			>
				How was the game?
			</label>
			<div>
				<ReactStars
					count={5}
					value={ratingValue}
					onChange={ratingChanged}
					size={24}
					activeColor="#ffd700"
				/>
			</div>
			<textarea
				onChange={handleInput}
				value={review}
				id="message"
				rows="4"
				className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-lemon focus:border-lemon dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lemon dark:focus:border-lemon"
				placeholder="Leave a review..."
			></textarea>
			<small className="text-amber"> {errors?.review}</small>
			<button
				type="button"
				className="mt-5 text-white bg-grass hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-lightGray/40"
				onClick={handleReview}
				disabled={!enableButton}
			>
				Submit
			</button>
		</div>
	);
}
