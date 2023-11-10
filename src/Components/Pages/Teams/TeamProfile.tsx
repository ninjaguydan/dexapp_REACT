import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "redux/store";

import ReplyList from "components/common/posts/ReplyList";

import TeamStats from "components/pages/teams/TeamStats";
import TeamResistance from "components/pages/teams/TeamResistance";
import TeamGrid from "components/common/posts/TeamGrid";

import useTeam from "hooks/useTeam";

import { checkNum } from "utils/Helpers";
import { ITeam } from "utils/Interfaces";
import { memo, useEffect } from "react";

function TeamProfile() {
  const { teamName } = useParams();
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const team = useSelector((state: RootState) => state.teams.filter((team: ITeam) => team.name === teamName)[0]);
  const created_by = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "team" && reply.forId === team.id)
  );
  const { summary, loadingSummary } = useTeam(team.members);

  console.log(team);

  return (
    <div className="flex flex-col w-full gap-4 md:flex-row">
      <aside className="flex flex-col sm:flex-row gap-x-2 md:w-6/12 md:flex-col">
        <TeamStats
          currentUser={currentUser}
          team={team}
          stats={summary.statTable}
          user={created_by.username}
        />
        <br />
        <TeamResistance rTable={summary.resistanceTable} />
      </aside>

      <div className="flex flex-col w-full gap-4">
        <TeamGrid
          team={summary.teamData}
          isLoading={loadingSummary}
        />
        <ReplyList
          replies={replies}
          user={created_by.username}
          kind={{ name: "team", id: team.id }}
        />
      </div>
    </div>
  );
}
export default memo(TeamProfile);
