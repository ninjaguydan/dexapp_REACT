import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from 'hooks/hooks'
import { auth_LOGOUT } from 'redux/slices/authSlice'

interface IDesktopMenu {
	username: string
	openDrop: () => void
}

const DesktopMenu = ({ username, openDrop }: IDesktopMenu) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onLogout = () => {
		openDrop()
		dispatch(auth_LOGOUT())
		navigate(`/login`)
	}
	return (
		<ul className=" fixed right-4 top-16 min-w-[10rem] rounded-md bg-gray1 py-2 text-left shadow-sm">
			<li>
				<Link
					className="flex w-full items-center gap-x-2 px-4 py-2 hover:bg-gray2"
					to={`/profile/${username}`}
					onClick={openDrop}
				>
					<i className="material-icons">account_circle</i>Profile
				</Link>
			</li>
			{/* <li>
				<Link className="dropdown-item" to="" onClick={openDrop}>
					<img classNameName="dex-icon nav-icon" src={dex_icon} alt="" /> Teams
				</Link>
			</li> */}
			<li>
				<button
					className="flex w-full items-center px-4 py-2 hover:bg-gray2 hover:text-secondary"
					onClick={() => onLogout()}
				>
					Logout
				</button>
			</li>
		</ul>
	)
}

export default DesktopMenu
