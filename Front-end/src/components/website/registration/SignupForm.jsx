import { Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function SignupForm() {
	const { nameInputR, emailInputR, passwordInputR, rPasswordInputR, errors } =
		useContext(AuthContext);
	return (
		<>
			<Input ref={nameInputR} label="Name" size="lg" />
			{errors?.name && (
				<small className="text-amber -mt-3">{errors?.name}</small>
			)}
			<Input ref={emailInputR} label="Email" size="lg" />
			{errors?.email && (
				<small className="text-amber -mt-3">{errors?.email}</small>
			)}
			<Input ref={passwordInputR} type="password" label="Password" size="lg" />
			{errors?.password && (
				<small className="text-red-600 -mt-3">
					{errors?.password.map((i) => {
						if (i.includes("characters")) {
							return i;
						}
					})}
				</small>
			)}
			<Input
				ref={rPasswordInputR}
				type="password"
				label="Confirm Password"
				size="lg"
			/>
			{errors?.password && (
				<small className="text-red-600  -mt-3">
					{errors?.password.map((i) => {
						if (i.includes("match")) {
							return i;
						}
					})}
				</small>
			)}
		</>
	);
}
