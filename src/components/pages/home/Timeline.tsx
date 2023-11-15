import Post from "components/common/posts/Post";
import Review from "components/common/posts/Review";
import TeamCard from "components/common/posts/TeamCard";
import { useAppSelector } from "hooks/hooks";
import { memo } from "react";
import { IPost, IReview, ITeam } from "utils/Interfaces";
import generateTimeline from "utils/generateTimeline";

function Timeline() {
  const posts = useAppSelector((state) => state.posts);
  const reviews = useAppSelector((state) => state.reviews);
  const teams = useAppSelector((state) => state.teams);
  const timeline = generateTimeline(posts, reviews, teams);

  return (
    <>
      {timeline.length === 0 ? (
        <div className="card">Nothing to show!</div>
      ) : (
        timeline.map((item, index) => {
          if (item.role === "team")
            return (
              <TeamCard
                team={item.content as ITeam}
                key={index}
              />
            );
          if (item.role === "review")
            return (
              <Review
                review={item.content as IReview}
                TL_view={true}
                key={index}
              />
            );
          return (
            <Post
              post={item.content as IPost}
              key={index}
            />
          );
        })
      )}
    </>
  );
}

export default memo(Timeline);
