import { IReview } from "../../../Helpers/Interfaces";
import Review from "./Review";

interface IReviewListProps {
  reviews: IReview[];
}

function ReviewList({ reviews }: IReviewListProps) {
  return (
    <>
      {reviews.map((review) => {
        return (
          <Review
            review={review}
            key={review.id}
            TL_view={false}
          />
        );
      })}
    </>
  );
}

export default ReviewList;
