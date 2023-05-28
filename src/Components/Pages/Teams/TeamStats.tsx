import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { RootState } from "../../../Redux/store";
import { ITeam, IUser, ILike, IRTable, ISTable, IPokemon } from "../../../Helpers/Interfaces";

interface ITeamSummaryProps {
  currentUser: IUser;
  team: ITeam;
  stats: ISTable;
}

export default function TeamSummary({ currentUser, team, stats }: ITeamSummaryProps) {
  const dispatch = useDispatch();
  const teamLikes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "team" && like.forId === team.id)
  );
  const created_by = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);

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
          by <Link to={`/profile/${created_by.username}`}>{created_by.username}</Link>
        </p>
        <div className="icon-container">
          <button
            className="fav"
            onClick={() => toggleLike()}>
            {currentUser && teamLikes.find((like) => like.user === currentUser.id) ? (
              <FaHeart style={{ color: "#009df1" }} />
            ) : (
              <FaRegHeart />
            )}
            {teamLikes.length}
            <span className="sr-only">likes</span>
          </button>
        </div>
      </li>

      {Object.keys(stats).map((stat) => (
        <li className="list-group-item striped">
          <p className="bold">{stat}</p>
          <span>{stats[stat]}</span>
        </li>
      ))}

      <li
        className="list-group-item"
        id="toggle-stats">
        <p>Hide/Display Team Stats</p>
      </li>
    </ul>
  );
}
