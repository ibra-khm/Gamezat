import { Input } from "@material-tailwind/react";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function LoginForm() {
	const { emailInput, passwordInput, loginErrors } = useContext(AuthContext);

	return (
		<>
			<Input ref={emailInput} label="Email" size="lg" />
			{loginErrors?.email && (
				<small className="text-red-600 -mt-3">{loginErrors?.email}</small>
			)}
			{loginErrors?.user && (
				<small className="text-red-600 -mt-3">{loginErrors?.user}</small>
			)}
			<Input ref={passwordInput} type="password" label="Password" size="lg" />
			{loginErrors?.password && (
				<small className="text-red-600 -mt-3">{loginErrors?.password}</small>
			)}
		</>
	);
}
