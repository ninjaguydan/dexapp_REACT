import { memo } from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'components/common/buttons/Avatar'
import Card from 'components/modules/Card'

import useLikes from 'hooks/dispatch/useLikes'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { reply_DESTROY, reply_LIKE, reply_UNLIKE } from 'redux/slices/replySlice'
import { selectUserById } from 'redux/slices/userSlice'
import { getTimeDifference, truncateStr } from 'utils/Helpers'
import { IReply } from 'utils/Interfaces'
import { ICON_KEY } from 'utils/iconKey'

interface Props {
	reply: IReply
}

function ReplyCard({ reply }: Props) {
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector(selectCurrentUser)
	const user = useAppSelector(state => selectUserById(state.users, reply.added_by))

	const toggleLike = () => {
		const payload = { replyId: reply.id, userId: currentUser.userInfo!.id }
		if (reply.likes.includes(currentUser.userInfo!.id)) {
			dispatch(reply_UNLIKE(payload))
		} else {
			dispatch(reply_LIKE(payload))
		}
	}

	const likeBtnData = {
		label: ICON_KEY.LIKES,
		content: reply.likes.length,
		action: () => toggleLike(),
		state: currentUser && !!reply.likes.find(like => like === currentUser.userInfo?.id),
	}

	return (
		<Card classList="first:mt-2 first:sm:mt-4 !bg-gray1">
			<Avatar user={user} classList="w-10 h-10" />
			<Card.Body>
				<h3 className="text-sm font-bold sm:text-base">
					<Link to={`/profile/${user.username}`} className="hover:underline">
						{truncateStr(user.name)}
					</Link>
					<span className="font-normal text-gray4"> {truncateStr(user.username)}</span>
					<span className="text-xs font-normal italic text-gray4">
						{' '}
						&#8226; {getTimeDifference(reply.created)}
					</span>
				</h3>
				<p className="text-xs sm:text-sm">{reply.content}</p>
				<Card.Actions
					like={likeBtnData}
					showDelete={currentUser.userInfo?.id === reply.added_by}
					delete={{ fn: () => dispatch(reply_DESTROY(reply.id)), label: 'comment' }}
				/>
			</Card.Body>
		</Card>
	)
}

export default memo(ReplyCard)
