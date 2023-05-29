import Post from "../Profile/Post";
import Review from "../Pokemon/Review";
import Team from "../Teams/Team";

import { IPost, IReview, ITeam } from "../../../Helpers/Interfaces";

interface ITimelineCardProps {
  review: boolean;
  team: boolean;
  data: IPost | IReview | ITeam;
}

function TimelineCard({ review = false, team = false, data }: ITimelineCardProps) {
  if (review) {
    return (
      <Review
        review={data as IReview}
        TL_view={true}
      />
    );
  }
  if (team) {
    return <Team team={data as ITeam} />;
  }

  return <Post post={data as IPost} />;
}

export default TimelineCard;
