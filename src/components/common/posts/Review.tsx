import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'components/common/buttons/Avatar'
import IconBtn from 'components/common/buttons/IconBtn'
import { Star, StarOutline } from 'components/common/icons/index'
import DeletePost from 'components/common/modals/DeletePost'
import ReplyList from 'components/common/posts/ReplyList'
import Card from 'components/modules/Card'
import Spinner from 'components/modules/Spinner'

import useLikes from 'hooks/dispatch/useLikes'
import useFetchPkmn from 'hooks/fetchers/useFetchPkmn'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { selectCurrentUser } from 'redux/slices/authSlice'
import { makeSelectRepliesByReview, reply_DESTROY_ALL_BY_ } from 'redux/slices/replySlice'
import { review_DELETE, review_LIKE, review_UNLIKE } from 'redux/slices/reviewSlice'
import { getTimeDifference, titleCase, truncateStr } from 'utils/Helpers'
import { IReview } from 'utils/Interfaces'
import { ICON_KEY } from 'utils/iconKey'
import setImage from 'utils/setDefaultImg'

interface Props {
	review: IReview
	TL_view: boolean
}

const setRating = (rating: number) => {
	const arr = [...Array(10).keys()]

	return arr.map((value, index) => {
		if (rating < index + 1) {
			return <StarOutline key={index} className="mr-1" />
		} else {
			return <Star key={index} className="mr-1" />
		}
	})
}
// TODO: Closing DeletePost should return focus to Delete Button
const Review = ({ review, TL_view = false }: Props) => {
	const dispatch = useAppDispatch()
	// logged in user
	const currentUser = useAppSelector(selectCurrentUser)
	// get memoized replies
	const selectReviewReplies = useMemo(makeSelectRepliesByReview, [])
	const replies = useAppSelector(state => selectReviewReplies(state, review.id))
	const [repliesVisible, setRepliesVisible] = useState(false)
	const [showPopup, setShowPopup] = useState(false)

	const user = useAppSelector(state => state.users.filter(user => user.id === review.added_by)[0])
	const {
		data: pkmnData,
		isLoading,
	}: { data?: { name: string; id: number }; isLoading: boolean } = useFetchPkmn(review.pkmn)
	const toggleLike = () => {
		const payload = { reviewId: review.id, userId: currentUser.userInfo!.id }
		if (review.likes.includes(currentUser.userInfo!.id)) {
			dispatch(review_UNLIKE(payload))
		} else {
			dispatch(review_LIKE(payload))
		}
	}

	const deleteBtnData = {
		label: ICON_KEY.DELETE,
		content: '',
		action: () => {
			setShowPopup(true)
		},
		state: true,
		classList: 'absolute top-4 right-4',
	}

	const likeBtnData = {
		label: ICON_KEY.LIKES,
		content: review.likes.length,
		action: () => toggleLike(),
		state:
			!!currentUser.userInfo &&
			!!review.likes.find(like => like === currentUser.userInfo?.id),
	}

	const commentBtnData = {
		label: ICON_KEY.COMMENTS,
		content: replies.length,
		action: () => {
			setRepliesVisible(!repliesVisible)
		},
		state: false,
	}

	if (isLoading || !pkmnData) {
		return <Spinner />
	}

	return (
		<Card>
			{TL_view ? (
				<Link to={`/pokemon/${pkmnData.id}`}>
					<img
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnData.id}.png`}
						alt={`${pkmnData.name}'s official sprite`}
						className="h-10 w-10 rounded-full bg-gray1 sm:h-16 sm:w-16"
						onError={e => {
							setImage(e)
						}}
					/>
				</Link>
			) : (
				<Avatar user={user} classList="w-10 h-10 sm:w-16 sm:h-16" />
			)}

			<Card.Body>
				<h2 className="text-sm font-bold sm:text-base">
					<Link to={`/profile/${user.username}`} className="hover:underline">
						{TL_view ? truncateStr(user.username) : truncateStr(user.name)}
					</Link>
					<span className="font-normal text-gray4">
						{' '}
						{TL_view ? 'reviewed' : truncateStr(user.username)}
					</span>
					{TL_view && (
						<Link to={`/pokemon/${pkmnData.id}`} className="hover:underline">
							{' '}
							{titleCase(pkmnData.name)}
						</Link>
					)}
					<span className="text-xs font-normal italic text-gray4">
						{' '}
						&#8226; {getTimeDifference(review.created)}
					</span>
				</h2>
				<span className="my-1 flex text-xs text-gray3 sm:my-2 sm:text-sm">
					{setRating(review.rating)}
				</span>
				<p className="text-xs sm:text-sm">{review.content}</p>
				<div className="flex gap-x-8">
					{currentUser.userInfo?.id === review.added_by && (
						<IconBtn btnData={deleteBtnData} />
					)}
					<IconBtn btnData={likeBtnData} />
					<IconBtn btnData={commentBtnData} />
				</div>
			</Card.Body>

			<div className="w-full">
				{repliesVisible && (
					<ReplyList
						replies={replies}
						user={user.username}
						kind={{ name: 'review', id: review.id }}
					/>
				)}
			</div>
			{showPopup && (
				<DeletePost
					onClose={() => {
						setShowPopup(false)
					}}
					onConfirm={() => {
						dispatch(review_DELETE(review.id))
						dispatch(reply_DESTROY_ALL_BY_({ id: review.id, type: 'review' }))
					}}
					label="review"
				/>
			)}
		</Card>
	)
}

export default memo(Review)
