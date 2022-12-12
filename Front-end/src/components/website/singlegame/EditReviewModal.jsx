import axios from "axios";
import { Modal } from "flowbite-react";
import React, { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import { updateReviews } from "../../../reducers/gameSlice";

export default function EditReviewModal({ show, reviewItem, closeModal }) {
	const dispatch = useDispatch();
	const { token } = useContext(AuthContext);
	const [ratingValue, setRatingValue] = useState(reviewItem?.stars);
	const [review, setReview] = useState(reviewItem?.review);
	const [enableButton, setEnableButton] = useState(false);

	const ratingChanged = (newRating) => {
		setRatingValue(newRating);
		setEnableButton(true);
	};

	const handleInput = (e) => {
		setReview(e.target.value);
		if (e.target.value != "") {
			setEnableButton(true);
		} else {
			setEnableButton(false);
		}
	};

	const handleEdit = () => {
		const data = {
			stars: ratingValue,
			review: review,
			game_id: reviewItem.game_id,
		};
		axios
			.put(`/api/reviews/${reviewItem.id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
				dispatch(updateReviews(res.data));
				closeModal();
			});
	};
	return (
		<React.Fragment>
			<Modal show={show} size="md" popup={true} onClose={closeModal}>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Edit your review...
						</h3>
						<div>
							<ReactStars
								count={5}
								value={reviewItem?.stars}
								onChange={ratingChanged}
								size={24}
								activeColor="#ffd700"
							/>
						</div>
						<textarea
							onChange={handleInput}
							defaultValue={reviewItem?.review}
							id="message"
							rows="4"
							className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-lemon focus:border-lemon dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lemon dark:focus:border-lemon"
							placeholder="Leave a review..."
						></textarea>
						<button
							type="button"
							className="mt-5 text-white bg-grass hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:disabled:bg-gray-600 disabled:bg-lightGray/40"
							onClick={handleEdit}
							disabled={!enableButton}
						>
							Submit
						</button>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}
