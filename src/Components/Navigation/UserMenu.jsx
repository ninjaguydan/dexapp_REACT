import dex_icon from "../../media/dex-icon-w.svg"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const UserMenu = ({ username, openDrop }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onLogout = () => {
		openDrop()
		dispatch({ type: "users/ON_LOGOUT" })
		navigate("/login")
	}
	return (
		<ul className="dropdown-menu dropdown-menu-dark dropdown-nav">
			<li>
				<Link className="dropdown-item" to={`/profile/${username}`} onClick={openDrop}>
					<i className="material-icons">account_circle</i>Profile
				</Link>
			</li>
			{/* <li>
				<Link className="dropdown-item" to="" onClick={openDrop}>
					<img classNameName="dex-icon nav-icon" src={dex_icon} alt="" /> Teams
				</Link>
			</li> */}
			<li>
				<hr className="dropdown-divider" />
			</li>
			<li>
				<button className="dropdown-item" onClick={() => onLogout()}>
					Logout
				</button>
			</li>
		</ul>
	)
}

export default UserMenu
