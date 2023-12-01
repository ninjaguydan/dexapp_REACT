import { useMemo, useRef, useState } from 'react'

import Avatar from 'components/common/buttons/Avatar'
import EditProfile from 'components/common/modals/EditProfile'
import Button from 'components/modules/Button'

import { useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { makeSelectPostsByUser } from 'redux/slices/postSlice'
import { selectReviewsByUser } from 'redux/slices/reviewSlice'
import { selectTeamsByCreator } from 'redux/slices/teamSlice'
import { IUser } from 'utils/Interfaces'

interface Props {
	user: IUser
}

function UserSummary({ user }: Props) {
	const [editForm, setEditForm] = useState<boolean>(false)
	const selectPosts = useMemo(makeSelectPostsByUser, [])
	const postCnt = useAppSelector(state => selectPosts(state, user.id)).length
	const reviewCnt = useAppSelector(state => selectReviewsByUser(state, user.id)).length
	const teamCnt = useAppSelector(state => selectTeamsByCreator(state, user.id)).length
	const currentUser = useAppSelector(selectCurrentUser)
	const buttonRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef()
	const focus = () => buttonRef.current?.focus()

	return (
		<ul className="group relative h-[fit-content] rounded border border-solid border-white border-opacity-10 bg-gray2 lg:min-w-[30%] [&_li:nth-child(even)]:bg-gray6">
			<li className="flex flex-col items-center gap-y-3 border-b border-solid border-white border-opacity-10 p-3 text-center sm:gap-y-4 sm:p-6">
				<div>
					<h1 className="text-3xl capitalize">{user.name}</h1>
					<p className="text-gray4">{user.username}</p>
				</div>
				<Avatar
					user={user}
					classList={'w-20 sm:w-full block max-w-[200px] sm:max-w-[120px]'}
				/>
				{user?.bio && <p className="bio max-w-[30ch] text-xs sm:text-sm">{user.bio}</p>}
				<div className="flex gap-x-4 text-sm sm:text-base">
					<p className="text-gray4">
						<span className="font-bold text-gray5">0 </span>
						Following
					</p>
					<p className="text-gray4">
						<span className="font-bold text-gray5">0 </span>
						Followers
					</p>
				</div>
			</li>
			{currentUser.userInfo?.id === user.id && (
				<li className="border-b border-solid border-white border-opacity-10 p-6">
					<Button.Secondary
						ref={buttonRef}
						action={() => {
							setEditForm(true)
						}}
					>
						Edit Profile
					</Button.Secondary>
				</li>
			)}
			{user?.location && (
				<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
					<p className="font-bold">Location</p>
					<span>{user.location}</span>
				</li>
			)}
			{user?.pronouns && (
				<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
					<p className="font-bold">Pronouns</p>
					<span>He/Him</span>
				</li>
			)}
			<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
				<p className="font-bold">Joined</p>
				<span>June 2022</span>
			</li>
			<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
				<p className="font-bold">Posts</p>
				<span>{postCnt}</span>
			</li>
			<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
				<p className="font-bold">Reviews</p>
				<span>{reviewCnt}</span>
			</li>
			<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
				<p className="font-bold">Teams</p>
				<span>{teamCnt}</span>
			</li>
			<li className="flex justify-between border-b border-solid border-white border-opacity-10 px-8 py-2 text-xs sm:px-6 sm:text-sm">
				<p className="font-bold">Favorites</p>
				<span>0</span>
			</li>
			{editForm && (
				<EditProfile
					closeEdit={() => {
						setEditForm(false)
						focus()
					}}
				/>
			)}
		</ul>
	)
}

export default UserSummary
