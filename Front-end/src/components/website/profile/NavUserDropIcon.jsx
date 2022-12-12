import React, { useContext } from "react";
import { Dropdown, Avatar } from "flowbite-react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
export default function NavUserDropIcon() {
	const { logout, user } = useContext(AuthContext);

	return (
		<>
			<Dropdown
				className=""
				label={
					<Avatar
						img={`${user?.image
							? user?.image
							: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
							}`}
						rounded={true}
					/>
				}
				arrowIcon={false}
				inline={true}
				referrerPolicy="no-referrer"
			>
				<Dropdown.Header>
					<span className="block text-sm">{user?.name}</span>
					<span className="block truncate text-sm font-medium">
						{user?.email}
					</span>
				</Dropdown.Header>
				<Dropdown.Item>
					<Link to={"/profile"}>Profile</Link>
				</Dropdown.Item>
				{
					user && user?.role == 'admin' ? <Dropdown.Item>
						<Link to={"/dashboard"}>DashBoard</Link>
					</Dropdown.Item>
						: null
				}

				<Dropdown.Divider />
				<Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
			</Dropdown>
		</>
	);
}
