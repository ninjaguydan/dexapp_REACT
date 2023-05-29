import { useSelector } from "react-redux";

import TimelineCard from "./TimelineCard";
import PostForm from "../../Forms/PostForm";

import generateTimeline from "../../../Helpers/generateTimeline";
import { RootState } from "../../../Redux/store";

function Timeline() {
  const posts = useSelector((state: RootState) => state.posts);
  const reviews = useSelector((state: RootState) => state.reviews);
  const teams = useSelector((state: RootState) => state.teams);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const timeline = generateTimeline(posts, reviews, teams);

  return (
    <div className="post-column main">
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
