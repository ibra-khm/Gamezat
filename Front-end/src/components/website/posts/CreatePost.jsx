import { Textarea } from "flowbite-react";
import React, { useEffect, useState, useContext } from "react";
import { BsHeart } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import swal from "sweetalert";
import { useRef } from "react";
export default function CreatePost({ setPosts }) {
	const { user, token, setShowPortal } = useContext(AuthContext);

	//handling user input
	const inputPost = useRef();
	const imageInput = useRef();
	const [image, setImage] = useState();
	const [content, setContent] = useState("");

	//handling post submition
	function handleSubmit(e) {
		e.preventDefault();
		if (token) {
			let formData = new FormData();
			if (imageInput.current.value) {
				formData.append("image", image);
			}
			formData.append("content", content);
			if (content === "") {
				swal("Please write something first");
				return;
			}

			axios
				.post("/api/posts", formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-type": "multipart/form-data",
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						setPosts(res.data.data);
						inputPost.current.value = "";
						imageInput.current.value = null;
						swal("successful", "Your post is in review", "success");
					} else {
						console.log(res);
					}
				});
		} else {
			setShowPortal(true);
		}
	}

	return (
		<>
			<form className="" onSubmit={handleSubmit}>
				<div className="mb-5 shadow-sm hover:shadow-2xl scrollbar-thumb-rounded-full scrollbar-track-rounded-full  hover:border-transparent hover:shadow-indigo/50 hover:shadow-lg transition duration-300 hover:duration-300 ease-in-out shadow-lightGray/20 bg-white dark:bg-gray-800 border-indigo/50 dark:border-amber p-4 rounded-xl border-t-4 max-w-lg">
					<div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl">
						<div class="flex">
							<img
								class=" mr-2 h-11 w-11 rounded-full"
								src={`${
									user?.image
										? user?.image
										: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
								}`}
							/>
							<Textarea
								ref={inputPost}
								onChange={(e) => setContent(e.target.value)}
								className="bg-transparent scrollbar-hide  shadow-lg text-gray-400  focus:ring-amber focus:border-amber   rounded font-medium text-lg w-full"
								rows="2"
								cols="50"
								placeholder="What's happening?"
							/>
						</div>
					</div>
					<div class="flex justify-around ">
						<label
							htmlFor="image-upload"
							class="px-2 ring-1 h-9 hover:cursor-cell group flex items-center justify-center border-none text-lightGray dark:text-amber text-base leading-6 font-medium rounded-full hover:text-amber hover:shadow-lg hover:shadow-red transition duration-300 hover:duration-300 ease-in-out"
						>
							<span>
								<svg
									class=" text-center h-6 w-6"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
								<input
									ref={imageInput}
									name="image"
									id="image-upload"
									hidden
									type="file"
									onChange={(e) => {
										setImage(e.target.files[0]);
									}}
								/>
							</span>
							<span>Add Image</span>
						</label>
						{user ? (
							<button
								type="submit"
								class="bg-black  hover:shadow-xl float-right transition duration-300 hover:duration-300 ease-in-out hover:bg-amber text-white hover:text-white font-bold py-2 px-8 rounded-full"
							>
								Post
							</button>
						) : (
							<button
								type="button"
								onClick={setShowPortal(true)}
								class="bg-black  hover:shadow-xl float-right transition duration-300 hover:duration-300 ease-in-out hover:bg-amber text-white hover:text-white font-bold py-2 px-8 rounded-full"
							>
								Post
							</button>
						)}
					</div>
				</div>
			</form>
		</>
	);
}
