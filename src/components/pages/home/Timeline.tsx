import PostForm from "components/common/posts/PostForm";
import TimelineCard from "components/pages/home/TimelineCard";

import { useAppSelector } from "hooks/hooks";

import generateTimeline from "utils/generateTimeline";

import { selectCurrentUser } from "redux/slices/authSlice";

function Timeline() {
  const currentUser = useAppSelector(selectCurrentUser);
  const posts = useAppSelector((state) => state.posts);
  const reviews = useAppSelector((state) => state.reviews);
  const teams = useAppSelector((state) => state.teams);
  const timeline = generateTimeline(posts, reviews, teams);
  return (
    <div className="post-column main w-full max-w-2xl lg:max-w-none">
      {!!currentUser.userToken && (
        <PostForm
          btnText={"Post"}
          placeholder={"What's on your mind?"}
          type={{ name: "POST" }}
        />
      )}
      {timeline.length === 0 ? (
        <div className="card">Nothing to show!</div>
      ) : (
        timeline.map((item, index) => {
          return (
            <TimelineCard
              data={item}
              review={item.rating}
              team={item.name}
              key={index + 1}
            />
          );
        })
      )}
    </div>
  );
}

export default Timeline;
