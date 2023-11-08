import { useSelector } from "react-redux";

import PostForm from "components/common/posts/PostForm";
import TimelineCard from "components/pages/home/TimelineCard";

import generateTimeline from "utils/generateTimeline";
import { RootState } from "redux/store";

function Timeline() {
  const posts = useSelector((state: RootState) => state.posts);
  const reviews = useSelector((state: RootState) => state.reviews);
  const teams = useSelector((state: RootState) => state.teams);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const timeline = generateTimeline(posts, reviews, teams);

  return (
    <div className="post-column main w-full max-w-2xl lg:max-w-none">
      {!!currentUser.id && (
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
