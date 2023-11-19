import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { IReply } from 'utils/Interfaces'

const initialState: IReply[] = [
	{
		id: 1,
		content: 'Wow son you a big ass hater',
		created: 1649163929404,
		added_by: 2,
		for: 'review',
		forId: 1,
		likes: [],
	},
	{
		id: 2,
		content: "It's not even the best Kanto starter.",
		created: 1651892729404,
		added_by: 1,
		for: 'review',
		forId: 1,
		likes: [],
	},
	{
		id: 3,
		content: 'Yeah right before they snatched it away one gen later lmaoo',
		created: 1651201529404,
		added_by: 1,
		for: 'review',
		forId: 2,
		likes: [],
	},
	{
		id: 4,
		content: 'Agreed!!!',
		created: 1651801529404,
		added_by: 2,
		for: 'post',
		forId: 3,
		likes: [1],
	},
	{
		id: 5,
		content: 'We can be friends!',
		created: 1651801009404,
		added_by: 2,
		for: 'post',
		forId: 1,
		likes: [],
	},
	{
		id: 6,
		content: 'Cool team!!! Red was the best trainer',
		created: 1651801009404,
		added_by: 3,
		for: 'team',
		forId: 1,
		likes: [],
	},
	{
		id: 'b7825e56-078f-4652-be34-af373c8e9c7a',
		content: 'guys. please. they all suck',
		created: 1655168868922,
		added_by: 3,
		for: 'review',
		forId: 1,
		likes: [],
	},
	{
		id: 7,
		content: 'No way...',
		created: 1699289597085,
		added_by: 1,
		for: 'post',
		forId: 5,
		likes: [],
	},
	{
		id: 8,
		content: 'Charizard might have the best one ngl',
		created: 1699289597085,
		added_by: 3,
		for: 'post',
		forId: 5,
		likes: [],
	},
]

const replySlice = createSlice({
	name: 'replies',
	initialState,
	reducers: {
		reply_CREATE(state, action: PayloadAction<IReply>) {
			const newReply = action.payload
			state.push(newReply)
		},
		reply_DESTROY(state, action: PayloadAction<number | string>) {
			const postId = action.payload
			return state.filter(reply => reply.id !== postId)
		},
		reply_DESTROY_ALL_BY_(state, action: PayloadAction<{ id: number | string; type: string }>) {
			const { id, type } = action.payload
			return state.filter(reply => reply.forId !== id && reply.for === type)
		},
		reply_LIKE(
			state,
			action: PayloadAction<{ replyId: number | string; userId: number | string }>,
		) {
			const { replyId, userId } = action.payload
			const likedReply = state.find(reply => reply.id === replyId)
			if (likedReply) {
				likedReply.likes.push(userId)
			}
		},
		reply_UNLIKE(
			state,
			action: PayloadAction<{ replyId: number | string; userId: number | string }>,
		) {
			const { replyId, userId } = action.payload
			const unlikedReply = state.find(reply => reply.id === replyId)
			if (unlikedReply) {
				unlikedReply.likes = unlikedReply.likes.filter(like => like !== userId)
			}
		},
	},
})

export const { reply_CREATE, reply_DESTROY, reply_DESTROY_ALL_BY_, reply_LIKE, reply_UNLIKE } =
	replySlice.actions
export default replySlice.reducer

// Selectors
export const selectReplies = (state: RootState) => state.replies

export const makeSelectRepliesByPost = () =>
	createSelector([selectReplies, (state, postId) => postId], (replies, postId) =>
		replies.filter(reply => {
			return reply.for === 'post' && reply.forId === postId
		}),
	)
export const makeSelectRepliesByReview = () =>
	createSelector([selectReplies, (state, reviewId) => reviewId], (replies, reviewId) =>
		replies.filter(reply => {
			return reply.for === 'review' && reply.forId === reviewId
		}),
	)
export const makeSelectRepliesByTeam = () =>
	createSelector([selectReplies, (state, teamId) => teamId], (replies, teamId) =>
		replies.filter(reply => {
			return reply.for === 'team' && reply.forId === teamId
		}),
	)
