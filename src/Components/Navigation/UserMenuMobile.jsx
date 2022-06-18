import React from "react"
import getImageByKey from "../../Helpers/getImageByKey"
import { Link, useNavigate } from "react-router-dom"
import dex_icon_w from "../../media/dex-icon-w.svg"
import { useDispatch } from "react-redux"

const UserMenuMobile = ({ user, openMenu }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onLogout = () => {
		openMenu()
		dispatch({ type: "users/ON_LOGOUT" })
		navigate("/login")
	}

	return (
		<div className="mobile-nav-slider">
			<img src={getImageByKey(user.user_img)} alt="user" className={`user-img ${user.bg_color}`} />
			<p className="bold">{user.name}</p>
			<p className="username">{user.username}</p>

			<div className="follow-cnt">
				<p>
					<span className="bold">0</span> Following
				</p>
				<p>
					<span className="bold">0</span> Followers
				</p>
			</div>
			<nav>
				<ul>
					<li>
						<Link to={`/profile/${user.username}`} onClick={openMenu}>
							<i className="material-icons">account_circle</i>Profile
						</Link>
					</li>
					<li>
						<Link to="/dex" onClick={openMenu}>
							<img src={dex_icon_w} alt="dexapp icon" /> Pokedex
						</Link>
					</li>
					<li>
						<Link to="/" onClick={openMenu}>
							<i className="material-icons">home</i>Home
						</Link>
					</li>
					<hr />
					<li>
						<button onClick={() => onLogout()}>Logout</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default UserMenuMobile
