import Review from "../Pokemon/Review"

function ReviewList({ reviews }) {
	return (
		<>
			{reviews.map((review) => {
				return <Review review={review} key={review.id} />
			})}
		</>
	)
}

export default ReviewList
