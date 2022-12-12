import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
	Button,
} from "@material-tailwind/react";
import { AuthContext } from "../../../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { GrFormClose } from "react-icons/gr";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";

export default function RegistrationPortal() {
	const [form, setForm] = useState(true);
	const {
		showPortal,
		setShowPortal,
		googleLoginFun,
		FacebookLoginFun,
		loginFun,
		registerFun,
	} = useContext(AuthContext);
	useEffect(() => {
		AOS.init({ once: true });
	}, []);
	return ReactDOM.createPortal(
		<>
			{showPortal ? (
				<div className="w-full h-full  fixed inset-0 flex justify-center items-center backdrop-blur-sm   ">
					<Card
						data-aos="fade-up  "
						data-aos-anchor-placement="bottom-bottom"
						className="w-96 xl:w-[500px] mt-10 "
					>
						<CardHeader
							variant="gradient"
							color="blue"
							className="mb-4 grid h-28 place-items-center"
						>
							<Typography variant="h3" color="white">
								{form ? "Login" : "Sign Up"}
							</Typography>
						</CardHeader>
						<CardBody className="flex flex-col gap-4">
							{form ? <LoginForm /> : <SignupForm />}
						</CardBody>
						<CardFooter className="pt-0">
							{form ? (
								<>
									<Button onClick={loginFun} variant="gradient" fullWidth>
										Login
									</Button>
								</>
							) : (
								<Button onClick={registerFun} variant="gradient" fullWidth>
									Sign Up
								</Button>
							)}
							<div className=" mt-3 gap-16 flex items-center justify-center  ">
								<GoogleLogin
									type="icon"
									onSuccess={googleLoginFun}
									onError={() => {
										console.log("Login Failed");
									}}
								/>

								<FacebookLogin
									className="bg-[#4267b2] hover:bg-[#4267b2]/95 p-2 rounded flex  text-white   items-center  gap-x-1"
									appId="848214096296806"
									onSuccess={(response) => {
										// console.log('Login Success!', response);
									}}
									onFail={(error) => {
										console.log("Login Failed!", error);
									}}
									onProfileSuccess={FacebookLoginFun}
								>
									<FaFacebook className="w-5 h-5" />
								</FacebookLogin>
							</div>
							<Typography variant="small" className="mt-6 flex justify-center">
								{form ? "Don't have an account?" : "Already have an account?"}

								<Typography
									variant="small"
									color="blue"
									className="ml-1 font-bold"
								>
									<span
										className="cursor-pointer"
										onClick={() => setForm(!form)}
									>
										{" "}
										{form ? "Sign up" : "Login"}{" "}
									</span>
								</Typography>
							</Typography>
							<hr class="my-2 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
							<Button
								onClick={() => {
									setShowPortal(!showPortal);
									setForm(true);
								}}
								variant="gradient"
								color="red"
								fullWidth
							>
								Cancel
							</Button>
						</CardFooter>
					</Card>
				</div>
			) : null}
		</>,
		document.getElementById("portal")
	);
}
