import { useState } from 'react'

import Logo from 'components/common/buttons/Logo'
import MenuBtn from 'components/common/buttons/MenuBtn'
import DesktopNav from 'components/common/navigation/DesktopNav'
import MobileMenu from 'components/common/navigation/MobileMenu'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'

const SiteHeader = () => {
	const currentUser = useAppSelector(selectCurrentUser)
	const [menuIsOpen, setMenuIsOpen] = useState(false)

	const menuBtnData = {
		isOpen: menuIsOpen,
		isVisible: !!currentUser.userInfo,
		action: () => {
			setMenuIsOpen(!menuIsOpen)
		},
	}
	const menuData = {
		isOpen: menuIsOpen,
		user: currentUser.userInfo!,
		closeMenu: () => {
			setMenuIsOpen(false)
		},
	}

	return (
		<header className="fixed z-[1] flex w-full items-center justify-between border-b border-solid border-gray3 bg-gray2 p-4 sm:px-8">
			<Logo />
			<MenuBtn data={menuBtnData} />
			<MobileMenu data={menuData} />
			<DesktopNav />
		</header>
	)
}

export default SiteHeader
