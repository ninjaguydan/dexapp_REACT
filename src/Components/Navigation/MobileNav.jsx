import React from "react"
import dex_icon from "../../media/dex-icon-w.svg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import UserIcon from "./UserIcon"

const MobileNav = ({ searchBtn }) => {
	const user = useSelector((state) => state.loggedUser)

	return (
		<nav>
			<ul className="mobile-nav">
				{/* <li>{searchBtn}</li> */}
				<li>
					<Link to="/">
						<i className="material-icons" aria-hidden="true">
							home
						</i>
						<span className="sr-only">home</span>
					</Link>
				</li>
				<li>
					<Link to="/dex">
						<img className="dex-icon nav-icon" src={dex_icon} alt="" aria-hidden="true" />
						<span className="sr-only">pokemon index</span>
					</Link>
				</li>
				<li>
					{user ? (
						<UserIcon userImg={user.user_img} userName={user.username} userColor={user.bg_color} mobileNav={"nav-user-icon"} />
					) : (
						<Link to="/login">
							<i className="material-icons" aria-hidden="true">
								account_circle
							</i>
							<span className="sr-only">login or signup</span>
						</Link>
					)}
				</li>
			</ul>
		</nav>
	)
}

export default MobileNav
