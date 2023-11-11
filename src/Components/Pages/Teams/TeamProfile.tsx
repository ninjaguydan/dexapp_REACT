import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "redux/store";

import ReplyList from "components/common/posts/ReplyList";

import TeamStats from "components/pages/teams/TeamStats";
import TeamResistance from "components/pages/teams/TeamResistance";
import TeamGrid from "components/common/posts/TeamGrid";

import { IReply, ITeam, IUser } from "utils/Interfaces";
import { memo } from "react";

function TeamProfile() {
  const { teamName } = useParams();
  const team: ITeam = useSelector((state: RootState) => state.teams.filter((team) => team.name === teamName)[0]);
  const current_user: IUser = useSelector((state: RootState) => state.loggedUser);
  const created_by: string = useSelector(
    (state: RootState) => state.users.filter((user) => user.id === team.added_by)[0].username
  );
  const replies: IReply[] = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "team" && reply.forId === team.id)
  );

  return (
    <div className="flex flex-col w-full gap-4 md:flex-row">
      <aside className="flex flex-col sm:flex-row gap-4 md:w-6/12 md:flex-col">
        <TeamStats
          current_user_id={current_user.id}
          team={team}
          created_by={created_by}
        />
        <TeamResistance team={team.members} />
      </aside>

      <div className="flex flex-col w-full gap-4">
        <TeamGrid team={team.members} />
        <ReplyList
          replies={replies}
          user={created_by}
          kind={{ name: "team", id: team.id }}
        />
      </div>
    </div>
  );
}
export default memo(TeamProfile);
