import React from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import UserIcon from "./UserIcon"
import { FaAngleDown } from "react-icons/fa"
import { truncateStr } from "../../Helpers/Helpers"

const DesktopNav = ({ searchBtn, openDrop }) => {
	const user = useSelector((state) => state.loggedUser)

	return (
		<nav>
			<ul className="main-nav">
				<li>{searchBtn}</li>
				<li>
					<NavLink to="/">Home</NavLink>
				</li>
				<li>
					<NavLink to="/dex">Pokedex</NavLink>
				</li>
				{user ? (
					<li className="nav-user-desk">
						<UserIcon userImg={user.user_img} userName={user.username} userColor={user.bg_color} mobileNav={"nav-user-icon"} />
						<button className="btn" onClick={openDrop}>
							{truncateStr(user.username)}
							<FaAngleDown />
						</button>
					</li>
				) : (
					<>
						<li className="bold">
							<NavLink to="/register">Sign Up</NavLink>
						</li>
						<li className="bold">
							<NavLink to="/login">Login</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default DesktopNav
