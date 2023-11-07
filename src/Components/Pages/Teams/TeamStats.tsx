import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";

import IconBtn from "components/common/buttons/IconBtn";

import useLikes from "hooks/dispatch/useLikes";
import { ICON_KEY } from "utils/iconKey";
import { ITeam, IUser, ILike, IRTable, ISTable, IPokemon } from "utils/Interfaces";

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
  const toggleLike = useLikes(currentUser.id, teamLikes, "team", team.id) as () => void;

  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: teamLikes.length,
    action: () => toggleLike(),
    state: currentUser && !!teamLikes.find((like) => like.user === currentUser.id),
  };

  return (
    <ul className="w-full h-[fit-content] relative bg-gray2 rounded border border-white border-opacity-10 border-solid [&_li:nth-child(even)]:bg-gray6">
      <li className="border-b border-white border-opacity-10 border-solid p-3 sm:p-6 text-center flex flex-col gap-y-2 sm:gap-y-4 items-center">
        <div>
          <h2 className="capitalize text-2xl">{team.name}</h2>
          <p className="text-gray4">
            by <Link to={`/profile/${user}`}>{user}</Link>
          </p>
        </div>
        <div className="icon-container">
          <IconBtn btnData={likeBtnData} />
        </div>
      </li>
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
    </ul>
  );
}
