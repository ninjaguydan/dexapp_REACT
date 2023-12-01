import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'redux/store'
import { IReview } from 'utils/Interfaces'

const initialState: IReview[] = [
	{
		id: 1,
		content: 'What an over rated piece of garbage!!',
		rating: 3,
		created: 1655158527085,
		added_by: 1,
		pkmn: 6,
		likes: [],
	},
	{
		id: 2,
		content: 'Mega evolution made him cool again',
		rating: 9,
		created: 1633439194661,
		added_by: 2,
		pkmn: 6,
		likes: [],
	},
	{
		id: 3,
		content: 'Bulba is great!',
		rating: 6,
		created: 1633439233667,
		added_by: 1,
		pkmn: 1,
		likes: [],
	},
	{
		id: 4,
		content: "Best Middle Evo and it's not even close!!",
		rating: 8,
		created: 1638709633667,
		added_by: 1,
		pkmn: 8,
		likes: [1],
	},
	{
		id: 5,
		content: 'big C H O N K',
		rating: 10,
		created: 1633439233667,
		added_by: 1,
		pkmn: 3,
		likes: [],
	},
	{
		added_by: 10,
		content: 'tf is this',
		created: 1701393031930,
		id: '6ee64edb-84bf-4ba1-b1d3-a66e66f77228',
		likes: [],
		pkmn: 959,
		rating: 1,
	},
]

const reviewSlice = createSlice({
	name: 'reviews',
	initialState,
	reducers: {
		review_CREATE(state, action: PayloadAction<IReview>) {
			const newReview = action.payload
			state.push(newReview)
		},
		review_DELETE(state, action: PayloadAction<string | number>) {
			const reviewId = action.payload
			return state.filter(review => review.id !== reviewId)
		},
		review_LIKE(
			state,
			action: PayloadAction<{ reviewId: number | string; userId: number | string }>,
		) {
			const { reviewId, userId } = action.payload
			const likedReview = state.find(review => review.id === reviewId)
			if (likedReview) {
				likedReview.likes.push(userId)
			}
		},
		review_UNLIKE(
			state,
			action: PayloadAction<{ reviewId: number | string; userId: number | string }>,
		) {
			const { reviewId, userId } = action.payload
			const unlikedReview = state.find(review => review.id === reviewId)
			if (unlikedReview) {
				unlikedReview.likes = unlikedReview.likes.filter(like => like !== userId)
			}
		},
	},
})

export const { review_CREATE, review_DELETE, review_LIKE, review_UNLIKE } = reviewSlice.actions
export default reviewSlice.reducer

// Selectors
export const selectReviews = (state: RootState) => state.reviews

export const makeSelectReviewsByPkmn = () =>
	createSelector(
		[selectReviews, (state: RootState, pkmnId: number) => pkmnId],
		(reviews, pkmnId) => reviews.filter(review => review.pkmn === pkmnId),
	)
export const makeSelectReviewCount = () =>
	createSelector(
		[selectReviews, (state: RootState, pkmnId: number | undefined) => pkmnId],
		(reviews, pkmnId) => reviews.filter(review => review.pkmn === pkmnId).length,
	)
export const makeSelectReviewsByUser = () =>
	createSelector(
		[selectReviews, (state: RootState, userId: number | string) => userId],
		(reviews, userId) => reviews.filter(review => review.added_by === userId),
	)
export const selectReviewsByUser = createSelector(
	[selectReviews, (state: RootState, userId: number | string) => userId],
	(reviews, userId) => reviews.filter(review => review.added_by === userId),
)
