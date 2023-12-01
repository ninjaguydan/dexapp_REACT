import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'

import Avatar from 'components/common/buttons/Avatar'

import { useAppDispatch } from 'hooks/hooks'
import useDeviceWidth from 'hooks/useDeviceWidth'
import dex_icon_w from 'media/dex-icon-w.svg'
import { auth_LOGOUT } from 'redux/slices/authSlice'
import { IUser } from 'utils/Interfaces'

interface Props {
	data: {
		isOpen: boolean
		user: IUser
		closeMenu: () => void
	}
}

const MobileMenu = ({ data: { isOpen, user, closeMenu } }: Props) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const breakpoint = useDeviceWidth()

	if (!isOpen || breakpoint !== 'MOBILE') return <></>

	const onLogout = () => {
		closeMenu()
		dispatch(auth_LOGOUT())
		navigate(`/login`)
	}

	return createPortal(
		<div className="slider fixed right-0 top-0 z-[2] flex h-full w-4/5 flex-col gap-y-4 rounded-l-lg border-l border-solid border-gray-500 bg-gray1 p-8">
			<Avatar user={user} classList="w-20 h-20" clickAction={closeMenu} />
			<div>
				<p className="font-bold">{user.name}</p>
				<p className="text-gray3">{user.username}</p>
				<div className="flex gap-x-4">
					<p className="text-gray3">
						<span className="font-bold text-gray5">0</span> Following
					</p>
					<p className="text-gray3">
						<span className="font-bold text-gray5">0</span> Followers
					</p>
				</div>
			</div>

			<nav>
				<Link
					to={`/profile/${user.username}`}
					onClick={closeMenu}
					className="flex h-14 items-center gap-x-3 hover:text-secondary"
				>
					<i className="material-icons">account_circle</i>Profile
				</Link>
				<Link
					to="/"
					onClick={closeMenu}
					className="flex h-14 items-center gap-x-3 hover:text-secondary"
				>
					<img
						src={dex_icon_w as unknown as string}
						alt="dexapp icon"
						className="h-5 w-5"
					/>{' '}
					Pokedex
				</Link>
				<Link
					to="/"
					onClick={closeMenu}
					className="flex h-14 items-center gap-x-3 hover:text-secondary"
				>
					<i className="material-icons">home</i>Home
				</Link>
				<hr />
				<button
					onClick={() => onLogout()}
					className="flex h-14 w-full items-center gap-x-3 hover:text-secondary"
				>
					Logout
				</button>
			</nav>
		</div>,
		document.body,
	)
}

export default MobileMenu
