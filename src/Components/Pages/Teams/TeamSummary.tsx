import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import ReplyList from "components/common/cards/ReplyList";
import Loading from "components/common/loader/Loading";
import TeamStats from "components/pages/teams/TeamStats";
import TeamResistance from "components/pages/teams/TeamResistance";
import TeamGrid from "components/pages/teams/TeamGrid";

import useTeam from "hooks/useTeam";
import { ITeam, IUser, ILike } from "utils/Interfaces";
import { RootState } from "redux/store";

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
