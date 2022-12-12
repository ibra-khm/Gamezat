import React, { useContext, useState } from "react";
import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { AuthContext } from "../../context/AuthContext";

import { BiMap } from "react-icons/bi";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ProfileComments from "../../components/website/profile/ProfileComments";
import swal from "sweetalert";
import FavoriteGames from "../../components/website/profile/FavoriteGames";
import UserReviews from "../../components/website/profile/UserReviews";
import UserPosts from "../../components/website/profile/UserPosts";
export default function Profile() {
	const navigate = useNavigate();

	const [favCount, setFavCount] = useState(0);
	const [postCount, setPostCount] = useState(0);
	const [commentCount, setCommentCount] = useState(0);

	const { user, token, setUser, logout } = useContext(AuthContext);
	const [cookies, setCookie, removeCookie] = useCookies(["Token"]);
	useEffect(() => {
		if (!cookies.Token) {
			// setShowPortal(true)
			navigate("/");
		}
	}, [cookies.Token]);

	// Function to update user info
	const updateProfileData = (e) => {
		if (cookies.Token) {
			const data = { [e.target.name]: e.target.value };
			// console.log(data);
			// return
			axios.get("/sanctum/csrf-cookie").then((response) => {
				axios
					.put("/api/user/update", data, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						if (res.data.status === 200) {
							// console.log("updated");
							axios
								.get("/api/user", {
									headers: {
										Authorization: `Bearer ${token}`,
									},
								})
								.then((res) => {
									if (res.data.status === 200) {
										setUser(res.data.user);
									} else {
										console.log(res);
									}
								});
						} else {
							console.log(res);
						}
					});
			});
		} else {
			return;
		}
	};

	// Function to update user image
	const handleProfilePic = (e) => {
		let image = e.target.files[0];
		let formData = new FormData();
		formData.append("image", image);

		axios
			.post("/api/profileimage", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setUser(res.data.user);
					console.log(res);
				} else {
					swal("Oops!", res.data.image[0], "error");
					formData.delete("image");
					console.log(res);
				}
			})
			.catch((res) => {
				if (res.response.status === 413) {
					swal("Oops!", res.response.statusText, "error");
					formData.delete("image");
				}
			});
	};

	// Function to update user banner
	const handleBanner = (e) => {
		let image = e.target.files[0];
		let formData = new FormData();
		formData.append("banner", image);

		axios
			.post("/api/profilebanner", formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					setUser(res.data.user);
					console.log(res);
				} else {
					swal("Oops!", res.data.banner[0], "error");
					e.target.files = null;
					formData.delete("image");
					console.log(res);
				}
			})
			.catch((res) => {
				if (res.response.status === 413) {
					swal("Oops!", res.response.statusText, "error");
					formData.delete("image");
				}
			});
	};

	return (
		<>
			<div>
				<div className="profile-page ">
					<section className="block h-[500px]">
						<div
							className=" top-0 w-full h-full bg-center bg-cover group relative"
							style={{
								backgroundImage: `url("${user?.banner
									? user?.banner
									: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
									}")`,
							}}
						>
							<label
								htmlFor="bannerImage"
								className=" group hover:bg-gray-200  opacity-60  absolute inset-0 flex justify-center items-center cursor-pointer transition duration-500"
							>
								<img
									className="hidden group-hover:block w-8 mb-10"
									src="https://www.svgrepo.com/show/33565/upload.svg"
									alt=""
								/>
							</label>
							<input
								type="file"
								className="hidden"
								id="bannerImage"
								onChange={handleBanner}
							/>
						</div>

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
					<section className="relative  py-16 bg-blueGray-200">
						<div className="container mx-auto px-4">
							<div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-darkGray dark:shadow-amber/50 dark:shadow-2xl dark:text-cream w-full mb-6 shadow-xl rounded-lg -mt-64">
								<div className="px-6">
									<div className="flex flex-wrap justify-center">
										<div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
											<div className="relative">
												<form
													className="group flex justify-center relative"
													encType="multipart/form-data"
												>
													<img
														className="h-32 w-32 -mt-10 rounded-full group-hover:scale-105 duration-200"
														src={
															user?.image
																? user?.image
																: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
														}
														alt=""
													/>
													<label
														htmlFor="profileImage"
														className="h-32 w-32 -mt-10 group hover:bg-gray-200 group-hover:scale-105 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
													>
														<img
															className="hidden group-hover:block w-5"
															src="https://www.svgrepo.com/show/33565/upload.svg"
															alt=""
														/>
													</label>
													<input
														type="file"
														className="hidden"
														id="profileImage"
														onChange={handleProfilePic}
													/>
												</form>
											</div>
										</div>
										<div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
											<div className="py-6 px-3 mt-32 sm:mt-0">
												<button
													className="bg-amber active:bg-amber/80 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
													type="button"
													onClick={logout}
												>
													Logout
												</button>
											</div>
										</div>
										<div className="w-full lg:w-4/12 dark:text-gray-300 px-4 lg:order-1">
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
									<div className="text-center dark:text-gray-200 flex flex-col justify-center items-center mt-12">
										<h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2 capitalize">
											{user?.name}
										</h3>
										<div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
											{user?.email}
										</div>
										<div className="mb-2 flex items-center gap-2 text-blueGray-600 mt-4 ">
											{user?.country ? <BiMap /> : ""}
											<span>{user?.country}</span>
										</div>
										<div className="mb-2 text-blueGray-600">{user?.about}</div>
									</div>
									<div className="mt-10 py-10 border-t border-blueGray-200 text-center ">
										<Tabs value="html">
											<TabsHeader className="dark:bg-gray-500">
												<Tab className=" " key={"1"} value={"Profile"}>
													Profile
												</Tab>
												<Tab key={"2"} value={"Activity"}>
													Activity
												</Tab>
												<Tab key={"3"} value={"Favorites"}>
													Favorites
												</Tab>
												<Tab key={"4"} value={"Reviews"}>
													Reviews
												</Tab>
												<Tab key={"5"} value={"Posts"}>
													Posts
												</Tab>
											</TabsHeader>
											<TabsBody>
												<TabPanel value={"Profile"}>
													<div className="grid lg:grid-cols-2 gap-4 sm:grid-cols-1  w-9/12 mt-3 mx-auto">
														<Input
															onBlur={updateProfileData}
															defaultValue={user?.name}
															size="md"
															name="name"
															label="Name"
															className="dark:text-gray-400 dark:focus:text-cream"
														/>
														<Input
															onBlur={updateProfileData}
															defaultValue={user?.age}
															size="md"
															label="Age"
															name="age"
															className="dark:text-gray-400 dark:focus:text-cream"

														/>
														<Input
															defaultValue={user?.email}
															size="md"
															label="Email"
															disabled
															className="dark:text-gray-400 dark:bg-blue-gray-800"

														/>
														<Input
															onBlur={updateProfileData}
															defaultValue={user?.country}
															size="md"
															label="Country"
															name="country"
															className="dark:text-gray-400 dark:focus:text-cream"

														/>
														<Input
															onBlur={updateProfileData}
															defaultValue={user?.about}
															size="md"
															label="About"
															name="about"
															className="dark:text-gray-400 dark:focus:text-cream"

														/>
														<Input
															onBlur={updateProfileData}
															defaultValue={user?.games}
															size="md"
															label="Games"
															name="games"
															className="dark:text-gray-400 dark:focus:text-cream"

														/>
													</div>
													{/* <div><button class="bg-indigo shadow-black hover:bg-blue-700 text-white font-bold py-2 px-16 mt-3 ">
                                                        Edit
                                                    </button></div> */}
												</TabPanel>
												<TabPanel value={"Activity"}>
													<div className="m-9 p-10 flex flex-col gap-3  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<ProfileComments
															setCommentCount={setCommentCount}
														/>
													</div>
												</TabPanel>
												<TabPanel value={"Posts"}>
													<div className="m-9 p-10 flex flex-wrap gap-3  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<UserPosts setPostCount={setPostCount} />
													</div>
												</TabPanel>
												<TabPanel value={"Favorites"}>
													<div className="m-9 p-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<FavoriteGames setFavCount={setFavCount} />
													</div>
												</TabPanel>
												<TabPanel value={"Reviews"}>
													<div className="m-9 p-10 grid grid-cols-1 xl:grid-cols-2 gap-5  max-h-96 rounded-3xl border-t-4 shadow-lg border-amber  dark:bg-slate-800   overflow-y-scroll  scrollbar-hide">
														<UserReviews />
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
