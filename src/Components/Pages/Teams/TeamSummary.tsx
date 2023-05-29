import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeartCirclePlus, faHeartCircleMinus, faShield, faHeart } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../../../Redux/store";
import { ITeam, IUser, ILike } from "../../../Helpers/Interfaces";
import useTeam from "../../../Hooks/useTeam";
import Loading from "../../Loader/Loading";
import TeamStats from "./TeamStats";
import TeamResistance from "./TeamResistance";
import ReplyList from "../../Layout/ReplyList";
import TeamGrid from "./TeamGrid";

export default function TeamSummary() {
  const { teamName } = useParams();
  const team = useSelector((state: RootState) => state.teams.filter((team: ITeam) => team.name === teamName)[0]);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const { summary, loadingSummary } = useTeam(team.members);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "team" && reply.forId === team.id)
  );
  const created_by = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);

  if (loadingSummary) {
    return <Loading />;
  }

  return (
    <div className="profile team-page">
      <aside>
        <TeamStats
          currentUser={currentUser}
          team={team}
          stats={summary.statTable}
          user={created_by.username}
        />
        <br />
        <TeamResistance rTable={summary.resistanceTable} />
      </aside>

      <div className="post-column">
        <TeamGrid team={summary.teamData} />
        <ReplyList
          replies={replies}
          user={created_by.username}
          kind={{ name: "team", id: team.id }}
        />
      </div>
    </div>
  );
}
