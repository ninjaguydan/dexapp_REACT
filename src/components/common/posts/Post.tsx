import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'components/common/buttons/Avatar'
import ReplyList from 'components/common/posts/ReplyList'
import Card from 'components/modules/Card'

import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { post_DELETE, post_LIKE, post_UNLIKE } from 'redux/slices/postSlice'
import { makeSelectRepliesByPost, reply_DESTROY_ALL_BY_ } from 'redux/slices/replySlice'
import { getTimeDifference, truncateStr } from 'utils/Helpers'
import { IPost } from 'utils/Interfaces'
import { ICON_KEY } from 'utils/iconKey'

interface IPostProps {
	post: IPost
}
function Post({ post }: IPostProps) {
	const dispatch = useAppDispatch()
	const currentUser = useAppSelector(selectCurrentUser)
	const selectPostReplies = useMemo(makeSelectRepliesByPost, [])
	const replies = useAppSelector(state => selectPostReplies(state, post.id))
	const [repliesVisible, setRepliesVisible] = useState(false)
	const user = useAppSelector(state => state.users.filter(user => user.id === post.added_by)[0])

	const toggleLike = () => {
		const payload = { postId: post.id, userId: currentUser.userInfo!.id }
		if (post.likes.includes(currentUser.userInfo!.id)) {
			dispatch(post_UNLIKE(payload))
		} else {
			dispatch(post_LIKE(payload))
		}
	}
	const deletePost = () => {
		dispatch(post_DELETE(post.id))
		dispatch(reply_DESTROY_ALL_BY_({ id: post.id, type: 'post' }))
	}

	const likeBtnData = {
		label: ICON_KEY.LIKES,
		content: post.likes.length,
		action: () => toggleLike(),
		state: !!currentUser && !!post.likes.find(like => like === currentUser.userInfo?.id),
	}
	const commentBtnData = {
		label: ICON_KEY.COMMENTS,
		content: replies.length,
		action: () => {
			setRepliesVisible(!repliesVisible)
		},
		state: false,
	}

	return (
		<Card>
			<Avatar user={user} classList="h-10 sm:h-16 w-10 sm:w-16" />

			<Card.Body>
				<h2 className="text-sm font-bold sm:text-base">
					<Link to={`/profile/${truncateStr(user.username)}`} className="hover:underline">
						{truncateStr(user.name)}
					</Link>
					<span className="font-normal text-gray4"> {truncateStr(user.username)}</span>
					<span className="text-xs font-normal italic text-gray4">
						{' '}
						&#8226; {getTimeDifference(post.created)}
					</span>
				</h2>
				<p className="text-xs sm:text-sm">{post.content}</p>
				<Card.Actions
					like={likeBtnData}
					comment={commentBtnData}
					delete={{ fn: deletePost, label: 'post' }}
					showDelete={currentUser.userInfo?.id === post.added_by}
				/>
			</Card.Body>

			<div className="w-full">
				{repliesVisible && (
					<ReplyList
						replies={replies}
						user={user.username}
						kind={{ name: 'post', id: post.id }}
					/>
				)}
			</div>
		</Card>
	)
}

export default memo(Post)
