import { Link } from 'react-router-dom'

import Avatar from 'components/common/buttons/Avatar'

import { useAppSelector } from 'hooks/hooks'
import useDeviceWidth from 'hooks/useDeviceWidth'
import dex_icon from 'media/dex-icon-w.svg'
import { selectCurrentUser } from 'redux/slices/authSlice'

export default function MobileNav() {
	const currentUser = useAppSelector(selectCurrentUser).userInfo
	const [breakpoint] = useDeviceWidth()

	if (breakpoint !== 'MOBILE') return <></>

	return (
		<nav className="fixed bottom-0 z-[1] flex w-full items-center justify-around border-t border-solid border-gray3 bg-gray2 px-5 pb-6 pt-2">
			{/* <SearchBtn /> */}
			<Link to="/" aria-label="home">
				<i className="material-icons text-3xl" aria-hidden="true">
					home
				</i>
			</Link>
			<Link to="/" aria-label="Pokemon Index">
				<img
					className="w-6"
					src={dex_icon as unknown as string}
					alt=""
					aria-hidden="true"
				/>
			</Link>
			{currentUser ? (
				<Avatar user={currentUser} classList="w-7" />
			) : (
				<Link to={`/login`} aria-label="Login or Signup">
					<i className="material-icons text-3xl" aria-hidden="true">
						account_circle
					</i>
				</Link>
			)}
		</nav>
	)
}
