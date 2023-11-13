import Post from "components/common/posts/Post";
import Review from "components/common/posts/Review";
import TeamCard from "components/common/posts/TeamCard";

import { IPost, IReview, ITeam } from "utils/Interfaces";

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
    return <TeamCard team={data as ITeam} />;
  }

  return <Post post={data as IPost} />;
}

export default TimelineCard;
