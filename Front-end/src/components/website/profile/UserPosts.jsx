import axios from "axios";
import { Dropdown } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { FiTrash2 } from "react-icons/fi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function UserPosts({ setPostCount }) {
	const { token } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		axios
			.get("/api/userposts", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setPosts(res.data.posts);
					setPostCount(res.data.posts.length);
				} else {
					setPostCount(0);
				}
			});
	}, [token]);
	return (
		<>
			{posts?.length > 0 ? (
				posts?.map((post) => {
					return (
						<div
							key={post?.id}
							className="bg-white dark:bg-gray-800  border-gray-200 w-80 dark:border-gray-800 p-4 rounded-xl border max-w-md mb-2"
						>
							<div className="flex justify-between">
								<div className="flex items-center">
									<img
										className="h-11 w-11 rounded-full"
										src={
											post?.user.image
												? post?.user.image
												: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
										}
									/>
									<div className="ml-1.5 text-sm leading-tight">
										<span className="text-black dark:text-white font-bold block ">
											{post?.user.name}
										</span>
										<span className="text-gray-500 dark:text-gray-400 font-normal block">
											{post?.user.email}
										</span>
									</div>
								</div>
								{/* <Dropdown inline={true} className="mt-0" placement="bottom">
									<Dropdown.Item className="hover:bg-cream">
										<FiTrash2 className="text-lg mb-1 dark:text-amber" /> &nbsp;
										Delete
									</Dropdown.Item>
								</Dropdown> */}
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
							{post?.image && (
								<img
									className="mt-2 rounded-2xl border border-gray-100 dark:border-gray-700"
									src={post?.image}
								/>
							)}
							<p className="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
								{post?.created_at.split("T")[0]}{" "}
								{post?.created_at.split("T")[1].split(".")[0]}
							</p>
							<div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
						</div>
					);
				})
			) : (
				<div className="text-center mx-auto dark:text-cream">No posts</div>
			)}
		</>
	);
}
