import Review from 'components/common/posts/Review'

import { IReview } from 'utils/Interfaces'

interface IReviewListProps {
	reviews: IReview[]
	pkmnView?: boolean
}

function ReviewList({ reviews, pkmnView = false }: IReviewListProps) {
	return (
		<>
			{reviews.map(review => {
				return <Review review={review} key={review.id} TL_view={pkmnView} />
			})}
		</>
	)
}

export default ReviewList
