import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FcComments } from "react-icons/fc";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
export default function ProfileComments({ setCommentCount }) {
	const { token, user } = useContext(AuthContext);
	const [comments, setComments] = useState([]);
	useEffect(() => {
		axios
			.get("/api/usercomments", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setComments(res.data.comments);
					setCommentCount(res.data.comments.length);
				}
			});
	}, [token]);
	return (
		<>
			{comments?.length > 0 ? (
				comments?.map((comment) => {
					return (
						<div class=" rounded-md p-2 shadow-xl">
							<p class="text-sm text-start text-black dark:text-white flex items-center gap-5">
								<FcComments />{" "}
								<span>
									{" "}
									You commented on{" "}
									{comment.post.user.id === user.id ? (
										"your"
									) : (
										<Link
											to={`/profile/${comment.post.user.id}`}
											className="text-amber/80 hover:underline"
										>
											{comment.post.user.name}
											{"'s"}
										</Link>
									)}{" "}
									Post {comment.comment} at {comment.created_at.split("T")[0]}
								</span>
							</p>
						</div>
					);
				})
			) : (
				<div className="text-center dark:text-cream">No activity</div>
			)}
		</>
	);
}
