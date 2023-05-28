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

export default function TeamSummary() {
  const { teamName } = useParams();
  const team = useSelector((state: RootState) => state.teams.filter((team: ITeam) => team.name === teamName)[0]);
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const { summary, loadingSummary } = useTeam(team.members);

  if (loadingSummary) {
    return <Loading />;
  }
  console.log(summary);

  return (
    <div className="profile">
      <TeamStats
        currentUser={currentUser}
        team={team}
        stats={summary.statTable}
      />
      <TeamResistance rTable={summary.resistanceTable} />

      <div className="post-column"></div>
    </div>
  );
}
