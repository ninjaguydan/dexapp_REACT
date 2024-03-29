import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import SearchBtn from 'components/common//buttons/SearchBtn'
import Avatar from 'components/common/buttons/Avatar'
import SearchBar from 'components/common/forms/SearchBar'
import { FaAngleDown } from 'components/common/icons/index'
import DesktopMenu from 'components/common/navigation/DesktopMenu'

import { useAppSelector } from 'hooks/hooks'
import useDeviceWidth from 'hooks/useDeviceWidth'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { truncateStr } from 'utils/Helpers'

let searchStyle = {
	TABLET: 'absolute left-0 top-[72px] border-b border-solid border-gray3',
	DESKTOP: 'min-w-[440px]',
}

const DesktopNav = () => {
	const currentUser = useAppSelector(selectCurrentUser)
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const breakpoint = useDeviceWidth()
	const [showSearch, setShowSearch] = useState(false)

	useEffect(() => {
		if (breakpoint === 'DESKTOP') {
			setShowSearch(true)
		} else {
			setShowSearch(false)
		}
	}, [breakpoint])

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
			<NavLink to={`/register`} className={'font-bold hover:text-secondary'}>
				Sign Up
			</NavLink>

			<NavLink to={`/login`} className={'font-bold hover:text-secondary'}>
				Login
			</NavLink>
		</>
	)

	return (
		<nav className="flex items-center gap-6">
			{breakpoint !== 'DESKTOP' && <SearchBtn action={() => setShowSearch(prev => !prev)} />}
			<SearchBar classList={searchStyle[breakpoint]} show={showSearch} />
			<NavLink to="/" className={'hover:text-secondary'}>
				Home
			</NavLink>

			<NavLink to="/" className={'hover:text-secondary'}>
				Pokedex
			</NavLink>

			{menuNode}
		</nav>
	)
}

export default DesktopNav
