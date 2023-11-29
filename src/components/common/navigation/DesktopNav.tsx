import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import SearchBtn from 'components/common//buttons/SearchBtn'
import Avatar from 'components/common/buttons/Avatar'
import { FaAngleDown } from 'components/common/icons/index'
import DesktopMenu from 'components/common/navigation/DesktopMenu'

import { ROOT_URL } from 'api/urls'
import { useAppSelector } from 'hooks/hooks'
import useDeviceWidth from 'hooks/useDeviceWidth'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { truncateStr } from 'utils/Helpers'

const DesktopNav = () => {
	const currentUser = useAppSelector(selectCurrentUser)
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const [breakpoint] = useDeviceWidth()

	if (breakpoint === 'MOBILE') return <></>

	let menuNode = currentUser.userInfo ? (
		<div className="nav-user-desk flex items-center gap-x-1">
			<Avatar user={currentUser.userInfo} classList="w-9 relative" />
			<button
				className="flex items-center gap-x-2 px-3 py-1 hover:text-secondary"
				onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
			>
				{truncateStr(currentUser.userInfo.username)}
				<FaAngleDown />
			</button>
			{dropdownIsOpen && (
				<DesktopMenu
					username={currentUser.userInfo.username}
					openDrop={() => setDropdownIsOpen(!dropdownIsOpen)}
				/>
			)}
		</div>
	) : (
		<>
			<NavLink to={`/${ROOT_URL}/register`} className={'font-bold hover:text-secondary'}>
				Sign Up
			</NavLink>

			<NavLink to={`/${ROOT_URL}/login`} className={'font-bold hover:text-secondary'}>
				Login
			</NavLink>
		</>
	)

	return (
		<nav className="flex w-[400px] items-center justify-between">
			<SearchBtn />

			<NavLink to={`/${ROOT_URL}`} className={'hover:text-secondary'}>
				Home
			</NavLink>

			<NavLink to={`/${ROOT_URL}`} className={'hover:text-secondary'}>
				Pokedex
			</NavLink>

			{menuNode}
		</nav>
	)
}

export default DesktopNav
