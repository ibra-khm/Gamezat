import React, { useEffect, useState, useContext } from "react";
import PostComp from "./PostComp";

export default function Post({ posts, setPosts }) {
	const approvedPosts = posts?.filter((post) => post.is_approved);
	return (
		<>
			{approvedPosts?.map((post) => {
				return <PostComp post={post} posts={posts} setPosts={setPosts} />;
			})}
		</>
	);
}
