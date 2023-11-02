import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ReplyList from "components/common/cards/ReplyList";
import { HeartOutline, Heart, ChatOutline } from "components/common/icons/index";

import { getTimeDifference } from "utils/Helpers";
import { ITeam } from "utils/Interfaces";
import { RootState } from "redux/store";

interface ITeamProps {
  team: ITeam;
}

function Team({ team }: ITeamProps) {
  let dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "team" && reply.forId === team.id)
  );
  let likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "team" && like.forId === team.id)
  );
  let currentUser = useSelector((state: RootState) => state.loggedUser);

  function toggleLike() {
    if (currentUser.id === 0) {
      return;
    }
    if (likes.find((like) => like.user === currentUser.id)) {
      let toDel = { name: "team", forId: team.id, user: currentUser.id };
      dispatch({ type: "users/UNLIKE", toDel });
    } else {
      let newLike = { postType: "team", user: currentUser.id, forId: team.id };
      dispatch({ type: "users/LIKE", newLike });
    }
  }

  return (
    <div className="card">
      <div className="content team">
        <h4>
          <Link to={`/profile/${user.username}`}>{user.username}</Link>
          <span> created the team, </span>
          <Link to={`/team/${team.name}`}> {team.name}</Link>
          <span className="date"> &#8226; {getTimeDifference(team.created)}</span>
        </h4>
        <span className="team-container">
          {team.members.map((value) => {
            return (
              <Link
                to={`/pokemon/${value}`}
                key={value}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`} />
              </Link>
            );
          })}
        </span>
      </div>
      <div className="icon-container">
        <button
          className="fav"
          onClick={() => toggleLike()}>
          {!!currentUser.id && likes.find((like) => like.user === currentUser.id) ? (
            <Heart style={{ color: "#009df1" }} />
          ) : (
            <HeartOutline />
          )}
          {likes.length}
          <span className="sr-only">likes</span>
        </button>
        <button
          className="fav"
          onClick={() => {
            setRepliesVisible(!repliesVisible);
          }}>
          <ChatOutline />
          {replies.length}
          <span className="sr-only">comments</span>
        </button>
      </div>
      <div className="replies">
        {repliesVisible && (
          <ReplyList
            replies={replies}
            user={user.username}
            kind={{ name: "team", id: team.id }}
          />
        )}
      </div>
    </div>
  );
}

export default Team;
