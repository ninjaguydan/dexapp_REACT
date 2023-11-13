import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";

import IconBtn from "components/common/buttons/IconBtn";

import useLikes from "hooks/dispatch/useLikes";
import { ICON_KEY } from "utils/iconKey";
import { ITeam, IUser, ISTable } from "utils/Interfaces";
import Button from "components/modules/Button";
import EditTeam from "components/common/modals/EditTeam";
import useSetStats from "hooks/fetchers/useSetStats";
import { makeSelectLikesBy } from "redux/slices/likeSlice";
import { useAppSelector } from "hooks/hooks";

interface ITeamStatsProps {
  current_user_id: string | number;
  team: ITeam;
  created_by: string;
}

export default function TeamStats({ current_user_id, team, created_by }: ITeamStatsProps) {
  // local state
  const [showStats, setShowStats] = useState(true);
  const [showEditTeam, setShowEditTeam] = useState(false);
  // hooks
  const { statTable: stats } = useSetStats(team.members);
  // get memoized likes
  const selectTeamLikes = useMemo(makeSelectLikesBy, []);
  const likes = useAppSelector((state) => selectTeamLikes(state.likes, { id: team.id, type: "team" }));
  // var
  const toggleLike = useLikes(current_user_id, likes, "team", team.id) as () => void;
  const buttonRef: React.MutableRefObject<HTMLButtonElement | undefined> = useRef();
  const focus = () => buttonRef.current?.focus();
  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: likes.length,
    action: () => toggleLike(),
    state: !current_user_id && !!likes.find((like) => like.user === current_user_id),
    classList: "!text-lg",
  };

  return (
    <ul className="w-full h-[fit-content] relative bg-gray2 rounded border border-white border-opacity-10 border-solid [&_li:nth-child(even)]:bg-gray6">
      <li className="border-b border-white border-opacity-10 border-solid p-3 sm:p-6 text-center flex flex-col gap-y-2 sm:gap-y-4 items-center">
        <div>
          <h2 className="capitalize text-2xl">{team.name}</h2>
          <p className="text-gray4">
            by <Link to={`/profile/${created_by}`}>{created_by}</Link>
          </p>
        </div>
        <div className="flex gap-x-8">
          <IconBtn btnData={likeBtnData} />
        </div>
      </li>
      {current_user_id === team.added_by && (
        <li className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
          <Button.Secondary
            ref={buttonRef}
            action={() => {
              setShowEditTeam(true);
            }}>
            Edit Team
          </Button.Secondary>
        </li>
      )}
      {showStats && (
        <>
          {Object.keys(stats).map((stat, i) => (
            <li
              key={i}
              className="border-b text-xs sm:text-sm border-white border-opacity-10 border-solid px-8 sm:px-6 py-2 flex justify-between">
              <p className="font-bold">{stat}</p>
              <span>{stats[stat]}</span>
            </li>
          ))}
        </>
      )}

      <li
        className="border-b border-white border-opacity-10 border-solid px-8 sm:px-6 p-3 sm:p-6 text-center"
        id="toggle-stats">
        <button
          className="py-1 px-8 w-full rounded border border-solid hover:bg-gray3 text-xs"
          onClick={() => {
            setShowStats(!showStats);
          }}>
          Hide/Display Team Stats
        </button>
      </li>
      {!!showEditTeam && (
        <EditTeam
          onClose={() => {
            setShowEditTeam(false);
            focus();
          }}
          team={team}
        />
      )}
    </ul>
  );
}
