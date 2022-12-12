import React, { useEffect, useState, useContext, useRef } from "react";
import { AccordionBody } from "@material-tailwind/react";
import { FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Dropdown, Modal } from "flowbite-react";
import { Accordion } from "@material-tailwind/react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { AuthContext } from "../../../context/AuthContext";
import { Textarea } from "flowbite-react";
import axios from "axios";
import swal from "sweetalert";
import PostReportModal from "./PostReportModal";
import { Link } from "react-router-dom";

export default function PostComp({ post, setPosts, posts }) {
	const [show, setShow] = useState(false);

	// close report model
	const closeModal = () => {
		setShow(false);
	};

	const { user, token, cookies, setShowPortal } = useContext(AuthContext);
	const [open, setOpen] = useState(0);
	const commentInput = useRef();

	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};
	const [comments, setComments] = useState({
		post_id: "",
		comment: "",
	});

	//handle comment submission
	function handleCommentSubmit(e) {
		e.preventDefault();
		if (token) {
			setComments({ ...comments, [e.target.name]: e.target.value });
			axios
				.post("/api/comments", comments, {
					headers: {
						Authorization: `Bearer ${cookies.Token}`,
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						setPosts(res.data.data);
						// setComments(res.data.data);
						commentInput.current.value = "";
						swal("success", "Comment Added Successfully", "success");
					}
					console.log(res);
				});
		} else {
			setShowPortal(true);
		}
	}

	//handle post delete event
	function handleDeletePost(id) {
		// Check if the authenticated user's ID matches the ID of the user who posted the post
		if (user.id === post.user.id) {
			console.log("the Token");
			console.log(cookies.Token);
			console.log(user.id);
			console.log(post.user.id);
			console.log(id);
			axios
				.delete(`/api/posts/${id}`, {
					headers: {
						Authorization: `Bearer ${cookies.Token}`,
					},
				})
				.then((res) => {
					console.log("hello");
					console.log(res.data.status);
					if (res.data.status === 200) {
						setPosts(res.data.data);
						swal("Success", `Post Deleted Successfully`, "success");
					}
				});
		} else {
			// Handle unauthorized delete attempt
			swal("error", "You are not authorized to delete this post!", "error");
		}
	}

	//render every post in database

	return (
		<>
			<PostReportModal show={show} closeModal={closeModal} post={post} />
			<div
				key={post?.id}
				className="bg-white hover:shadow-2xl transition duration-300 hover:duration-300 ease-in-out hover:shadow-indigo/50 shadow-lg dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-lg mb-2"
			>
				<div className="flex justify-between">
					<div className="flex items-center">
						<img
							className="h-11 w-11 rounded-full"
							src={post?.user.image}
							referrerPolicy="no-referrer"
						/>
						<div className="ml-1.5 text-sm leading-tight">
							{post?.user.id === user.id ? (
								<Link rel="stylesheet" to={`/profile`}>
									<span className="text-black dark:text-white font-bold block ">
										{post?.user.name}
									</span>
									<span className="text-gray-500 dark:text-gray-400 font-normal block">
										{post?.user.email}
									</span>
								</Link>
							) : (
								<Link rel="stylesheet" to={`/profile/${post?.user.id}`}>
									<span className="text-black dark:text-white font-bold block ">
										{post?.user.name}
									</span>
									<span className="text-gray-500 dark:text-gray-400 font-normal block">
										{post?.user.email}
									</span>
								</Link>
							)}
						</div>
					</div>
					<Dropdown inline={true} className="mt-0" placement="bottom">
						{user.id === post.user.id ? (
							<Dropdown.Item
								className="hover:bg-cream"
								onClick={() => handleDeletePost(post.id)}
							>
								<FiTrash2 className="text-lg mb-1 dark:text-amber" /> &nbsp;
								Delete
							</Dropdown.Item>
						) : (
							<Dropdown.Item
								className="hover:bg-cream"
								onClick={() => setShow(true)}
							>
								&nbsp; Report
							</Dropdown.Item>
						)}
					</Dropdown>

					{/* <svg className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg> */}
				</div>
				<div className="text-black dark:text-white block text-xl leading-snug mt-3">
					<ReactReadMoreReadLess
						charLimit={200}
						readMoreText={
							<MdExpandMore
								rounded={true}
								className="rounded inline hover:shadow-xl  hover:shadow-amber transition duration-300 hover:duration-300 ease-in-out"
							/>
						}
						readLessText={
							<MdExpandLess
								rounded={true}
								className="rounded inline hover:shadow-xl hover:shadow-amber transition duration-300 hover:duration-300 ease-in-out"
							/>
						}
					>
						{post?.content}
					</ReactReadMoreReadLess>
				</div>
				<img
					className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
					src={post?.image}
					referrerPolicy="no-referrer"
				/>
				<p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
					{post?.created_at.split("T")[0]}{" "}
					{post?.created_at.split("T")[1].split(".")[0]}
				</p>
				<div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
				<div className="text-gray-500 dark:text-gray-400 flex mt-3">
					{/* <div className="flex items-center mr-6">
                        <button className="fill-current text-black h-5 w-auto">
                            <BsHeart className='text-lg' />
                        </button>
                        <span className="ml-2">{post?.like ? post?.like.likes : '0'}</span>
                    </div> */}
					<div className="flex flex-row items-center mr-6">
						<button className="flex flex-row">
							<BiCommentDetail onClick={() => handleOpen(1)} className='text-xl mt-[0.2rem]' />
							<span className="ml-2">{post?.comments.length}</span>
						</button>
					</div>
				</div>

				<Accordion className="max-h-96" open={open === 1}>
					<AccordionBody>
						<form className="" onSubmit={handleCommentSubmit} method="post">
							<input name="post_id" type="hidden" />
							<div className="mb-1 shadow-md m-1 bg-white dark:bg-gray-800 hover:drop-shadow-xl hover:border-transparent border-indigo/50 hover:shadow-indigo/50 hover:shadow-md transition duration-300 hover:duration-300 ease-in-out p-4 rounded-xl border-t-4 max-w-lg">
								<div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-1 w-full rounded-xl">
									<div class="flex">
										<img
											class=" mr-2 h-11 w-11 rounded-full"
											referrerPolicy="no-referrer"
											src={`${user?.image
												? user?.image
												: "https://cdn0.iconfinder.com/data/icons/communication-456/24/account_profile_user_contact_person_avatar_placeholder-512.png"
												}`}
										/>
										<Textarea
											ref={commentInput}
											name="comment"
											onChange={(e) => {
												setComments({
													post_id: post?.id,
													comment: e.target.value,
												});
											}}
											className="bg-transparent scrollbar-hide ring-amber active:ring-amber focus:shadow-md focus:border-amber focus:ring-amber  shadow-lg text-gray-400 rounded font-medium text-lg w-full"
											rows="1"
											cols="50"
											placeholder="What's happening?"
										/>
									</div>
									<div class="flex">
										<div class="w-10"></div>
										<div class="w-64 px-2"></div>
										{user ? (
											<div class="">
												<button
													type="submit"
													class="bg-black hover:shadow-amber hover:border-black mt-2 hover:shadow-md transition duration-300 hover:duration-300 ease-in-out hover:bg-amber text-white hover:text-white font-bold py-2 px-8 ml-8 rounded-full float-right"
												>
													Post
												</button>
											</div>
										) : (
											<div class="">
												<button
													type="submit"
													class="bg-black hover:shadow-amber hover:border-black mt-2 hover:shadow-md transition duration-300 hover:duration-300 ease-in-out hover:bg-amber text-white hover:text-white font-bold py-2 px-8 ml-8 rounded-full float-right"
												>
													post
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						</form>
						{/* {post?.comments.length > 0 && ( */}
						<div className="py-5 flex-col flex gap-5 overflow-scroll scrollbar-thin scrollbar-thumb-amber scrollbar-round scrollbar-track-gray-200 scrollbar-hide h-[155px] max-h-[200px]  mx-auto bg-cream/20     px-4  mt-4 ">
							{post?.comments.map((comment) => {
								return (
									<>
										<div class="flex dark:bg-blue-gray-900 my-1 shadow-lg rounded hover:shadow-amber/50 dark:text-gray-200 transition duration-300 hover:duration-300 ease-in-out  flex-row">
											<img class="object-cover w-10 h-10 border-2 border-gray-300 rounded-full" alt="Bozo"
												src={comment?.user.image} />
											<div class="flex-col mt-1">
												<div class="flex items-center flex-1 px-4 font-bold leading-tight">{comment?.user.name}
													<span class="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">{comment.created_at.split('T')[0]}</span>
												</div>
												<div class="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600 dark:text-cream">
													{comment?.comment}
												</div>
											</div>
										</div>
									</>
								);
							})}
						</div>
						{/* )} */}
					</AccordionBody>
				</Accordion>
			</div>
		</>
	);
}

