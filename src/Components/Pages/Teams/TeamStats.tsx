import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { HeartOutline, Heart } from "components/common/icons/index";

import { ITeam, IUser, ILike, IRTable, ISTable, IPokemon } from "utils/Interfaces";
import { RootState } from "redux/store";

interface ITeamStatsProps {
  currentUser: IUser;
  team: ITeam;
  stats: ISTable;
  user: string;
}

export default function TeamStats({ currentUser, team, stats, user }: ITeamStatsProps) {
  const [showStats, setShowStats] = useState(true);
  const dispatch = useDispatch();
  const teamLikes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "team" && like.forId === team.id)
  );
  // const created_by = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);

  function toggleLike() {
    if (currentUser.id === 0) {
      return;
    }
    if (teamLikes.find((like) => like.user === currentUser.id)) {
      let toDel = { name: "team", forId: team.id, user: currentUser.id };
      dispatch({ type: "users/UNLIKE", toDel });
    } else {
      let newLike = { postType: "team", user: currentUser.id, forId: team.id };
      dispatch({ type: "users/LIKE", newLike });
    }
  }

  return (
    <ul className="card team-card">
      <li className="list-group-item">
        <h2 className="header1">{team.name}</h2>
        <p>
          by <Link to={`/profile/${user}`}>{user}</Link>
        </p>
        <div className="icon-container">
          <button
            className="fav"
            onClick={() => toggleLike()}>
            {currentUser && teamLikes.find((like) => like.user === currentUser.id) ? (
              <Heart style={{ color: "#009df1" }} />
            ) : (
              <HeartOutline />
            )}
            {teamLikes.length}
            <span className="sr-only">likes</span>
          </button>
        </div>
      </li>
      {showStats && (
        <>
          {Object.keys(stats).map((stat, i) => (
            <li
              key={i}
              className="list-group-item striped">
              <p className="bold">{stat}</p>
              <span>{stats[stat]}</span>
            </li>
          ))}
        </>
      )}

      <li
        className="list-group-item"
        id="toggle-stats">
        <button
          className="btn toggle-btn"
          onClick={() => {
            setShowStats(!showStats);
          }}>
          Hide/Display Team Stats
        </button>
      </li>
    </ul>
  );
}
