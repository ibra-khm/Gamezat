import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import swal from "sweetalert";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function ReportModal({ show, review, closeModal, game }) {
	const { token } = useContext(AuthContext);

	// Set feedback input
	const [feedback, setFeedback] = useState("");
	const handleInput = (e) => {
		setFeedback(e.target.value);
	};

	// handle report functionality
	const report = () => {
		const data = {
			feedback: feedback,
			review_id: review?.id,
			game_id: game?.guid,
		};
		axios
			.post("/api/reports", data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					swal(
						"Thanks for your report!",
						`We will review your report soon`,
						"success"
					);
					setFeedback("");
					closeModal();
				} else {
					swal("Oops!", `Some error has occured, please try again!`, "error");
				}
			});
	};

	return (
		<React.Fragment>
			<Modal show={show} size="md" popup={true} onClose={closeModal}>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Tell us what is the issue?
						</h3>
						<div>
							<textarea
								onChange={handleInput}
								value={feedback}
								id="message"
								rows="4"
								className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-lemon focus:border-lemon dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lemon dark:focus:border-lemon"
								placeholder="Leave a feedback..."
							></textarea>
						</div>
						<div className="w-full">
							<button
								type="button"
								className="mt-5 text-white bg-grass hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:bg-lightGray/40"
								onClick={report}
							>
								Report
							</button>
							{/* <Button onClick={report}>Report</Button> */}
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}
