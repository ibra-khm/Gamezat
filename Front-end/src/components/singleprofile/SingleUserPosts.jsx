import axios from "axios";
import { Dropdown } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { BsHeart } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { FiTrash2 } from "react-icons/fi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function SingleUserPosts({ setPostCount, id }) {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		axios.get(`/api/userposts/${id}`).then((res) => {
			if (res.data.status === 200) {
				setPosts(res.data.posts);
				setPostCount(res.data.posts.length);
			} else {
				setPostCount(0);
			}
		});
	}, []);
	return (
		<>
			{posts?.length > 0 ? (
				posts?.map((post) => {
					return (
						<div
							key={post?.id}
							className="bg-white dark:bg-gray-800 border-gray-200 w-80 dark:border-gray-800 p-4 rounded-xl border max-w-md mb-2"
						>
							<div className="flex justify-between">
								<div className="flex items-center">
									<img
										className="h-11 w-11 rounded-full"
										src={post?.user.image}
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
								<Dropdown inline={true} className="mt-0" placement="bottom">
									{/* <Dropdown.Item className="hover:bg-cream">
									<CgDanger className="text-xl dark:text-amber mb-1" /> &nbsp;
									Report
								</Dropdown.Item> */}
									<Dropdown.Item className="hover:bg-cream">
										<FiTrash2 className="text-lg mb-1 dark:text-amber" /> &nbsp;
										Delete
									</Dropdown.Item>
								</Dropdown>

								{/* <svg className="text-blue-400 dark:text-white h-6 w-auto inline-block fill-current" viewBox="0 0 24 24"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg> */}
							</div>
							<div className="text-black dark:text-white block text-xl text-start leading-snug mt-3">
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
							<p className="text-gray-500 dark:text-gray-400 text-start text-base py-1 my-0.5">
								{post?.created_at.split("T")[0]}{" "}
								{post?.created_at.split("T")[1].split(".")[0]}
							</p>
							<div className="border-gray-200 dark:border-gray-600 border border-b-0 my-1"></div>
						</div>
					);
				})
			) : (
				<div className="text-center">No posts</div>
			)}
		</>
	);
}
