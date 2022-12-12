import React, { useContext, useState } from "react";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";

import { BiMap } from "react-icons/bi";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import SingleUserReviews from "../../components/singleprofile/SingleUserReviews";
import SingleFavoriteGames from "../../components/singleprofile/SingleFavoriteGames";
import SingleUserPosts from "../../components/singleprofile/SingleUserPosts";
import { AuthContext } from "../../context/AuthContext";
export default function SingleProfile() {
	const { user } = useContext(AuthContext);
	const { id } = useParams();
	const navigate = useNavigate();
	const [singleUser, setSingleUser] = useState();
	const [favCount, setFavCount] = useState();
	const [postCount, setPostCount] = useState();
	const [commentCount, setCommentCount] = useState();

	useEffect(() => {
		if (user?.id && user?.id === singleUser?.id) {
			navigate("/profile");
		}
	}, [user]);

	// Get singleUser Info
	useEffect(() => {
		axios.get(`/api/user/${id}`).then((res) => {
			if (res.data.status === 200) {
				console.log(res);
				setSingleUser(res.data.user);
			} else {
				console.log(res);
			}
		});
	}, []);

	// GetCommentCount
	useEffect(() => {
		axios.get(`/api/usercomments/${id}`).then((res) => {
			if (res.data.status === 200) {
				console.log(res);
				setCommentCount(res.data.count);
			} else {
				console.log(res);
			}
		});
	}, []);

	return (
		<>
			<div>
				<div className="profile-page ">
					<section className="block h-[500px]">
						<div
							className=" top-0 w-full h-full bg-center bg-cover group relative"
							style={{
								backgroundImage: `url("${
									singleUser?.banner
										? singleUser?.banner
										: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
								}")`,
							}}
						></div>

						<div
							className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
							style={{ transform: "translateZ(0px)" }}
						>
							<svg
								className="absolute bottom-0 overflow-hidden"
								xmlns="http://www.w3.org/2000/svg"
								preserveAspectRatio="none"
								version="1.1"
								viewBox="0 0 2560 100"
								x={0}
								y={0}
							>
								<polygon
									className="text-blueGray-200 fill-current"
									points="2560 0 2560 100 0 100"
								/>
							</svg>
						</div>
					</section>
					<section className="relative py-16 bg-blueGray-200">
						<div className="container mx-auto px-4">
							<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
								<div className="px-6">
									<div className="flex flex-wrap justify-center">
										<div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
											<div className="relative">
												<form
													className="group flex justify-center relative"
													encType="multipart/form-data"
												>
													<img
														className="h-32 w-32 -mt-10 rounded-full  duration-200"
														src={
															singleUser?.image
																? singleUser?.image
																: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
														}
														alt=""
													/>
												</form>
											</div>
										</div>
										<div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
											<div className="py-6 px-3 mt-32 sm:mt-0">
												{/* <button
													className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
													type="button"
												>
													Connect
												</button> */}
											</div>
										</div>
										<div className="w-full lg:w-4/12 px-4 lg:order-1">
											<div className="flex justify-center py-4 lg:pt-4 pt-8">
												<div className="mr-4 p-3 text-center">
													<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
														{favCount}
													</span>
													<span className="text-sm text-blueGray-400">
														Favorites
													</span>
												</div>
												<div className="mr-4 p-3 text-center">
													<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
														{postCount}
													</span>
													<span className="text-sm text-blueGray-400">
														Posts
													</span>
												</div>
												<div className="lg:mr-4 p-3 text-center">
													<span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
														{commentCount}
													</span>
													<span className="text-sm text-blueGray-400">
														Comments
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className="text-center flex flex-col justify-center items-center mt-12">
										<h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2 capitalize">
											{singleUser?.name}
										</h3>
										<div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
											{singleUser?.email}
										</div>
										<div className="mb-2 flex items-center gap-2 text-blueGray-600 mt-4 ">
											{singleUser?.country ? <BiMap /> : ""}
											<span>{singleUser?.country}</span>
										</div>
										<div className="mb-2 text-blueGray-600">
											{singleUser?.about}
										</div>
									</div>
									<div className="mt-10 py-10 border-t border-blueGray-200 text-center ">
										<Tabs value="html">
											<TabsHeader>
												<Tab key={"1"} value={"Favorites"}>
													Favorites
												</Tab>
												<Tab key={"2"} value={"Reviews"}>
													Reviews
												</Tab>
												<Tab key={"3"} value={"Posts"}>
													Posts
												</Tab>
											</TabsHeader>
											<TabsBody>
												<TabPanel value={"Posts"}>
													<div className="m-9 p-10 flex flex-wrap gap-3  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<SingleUserPosts
															setPostCount={setPostCount}
															id={id}
														/>
													</div>
												</TabPanel>
												<TabPanel value={"Favorites"}>
													<div className="m-9 p-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<SingleFavoriteGames
															setFavCount={setFavCount}
															user={singleUser}
														/>
													</div>
												</TabPanel>
												<TabPanel value={"Reviews"}>
													<div className="m-9 p-10 grid grid-cols-1 xl:grid-cols-2 gap-5  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<SingleUserReviews user={singleUser} id={id} />
													</div>
												</TabPanel>
											</TabsBody>
										</Tabs>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
