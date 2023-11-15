import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "hooks/hooks";
import useLikes from "hooks/dispatch/useLikes";

import IconBtn from "components/common/buttons/IconBtn";
import ReplyList from "components/common/posts/ReplyList";
import Card from "components/modules/Card";

import placeholder from "media/0.png";

import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference } from "utils/Helpers";
import { IReply, ITeam } from "utils/Interfaces";

import { selectCurrentUser } from "redux/slices/authSlice";
import { makeSelectRepliesByTeam } from "redux/slices/replySlice";
import { selectUserById } from "redux/slices/userSlice";
import { team_LIKE, team_UNLIKE } from "redux/slices/teamSlice";

interface ITeamProps {
  team: ITeam;
}

function TeamCard({ team }: ITeamProps) {
  const dispatch = useAppDispatch();
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  // get memoized replies
  const selectTeamReplies = useMemo(makeSelectRepliesByTeam, []);
  const replies = useAppSelector((state) => selectTeamReplies(state, team.id));
  // get user
  const user = useAppSelector((state) => selectUserById(state.users, team.added_by));
  // init state
  const [repliesVisible, setRepliesVisible] = useState(false);
  // const toggleLike = useLikes(currentUser.userInfo.id, likes, "team", team.id) as () => void;
  const toggleLike = () => {
    const payload = { teamId: team.id, userId: currentUser.userInfo.id };
    if (team.likes.includes(currentUser.userInfo.id)) {
      dispatch(team_UNLIKE(payload));
    } else {
      dispatch(team_LIKE(payload));
    }
  };
  const arr = [...Array(6).keys()];

  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: team.likes.length,
    action: () => toggleLike(),
    state: !!currentUser.userToken && !!team.likes.find((like) => like === currentUser.userInfo.id),
  };

  const commentBtnData = {
    label: ICON_KEY.COMMENTS,
    content: replies.length,
    action: () => {
      setRepliesVisible(!repliesVisible);
    },
    state: false,
  };

  console.count("Team Card");

  return (
    <Card>
      <div className="content team flex flex-col gap-y-1">
        <h2 className="font-bold text-sm sm:text-base">
          <Link
            to={`/profile/${user.username}`}
            className="hover:underline">
            {user.username}
          </Link>
          <span className="text-gray4 font-normal"> created the team, </span>
          <Link
            to={`/team/${team.name}`}
            className="hover:underline capitalize">
            {" "}
            {team.name}
          </Link>
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(team.created)}</span>
        </h2>
        <span className="grid gap-x-4 sm:gap-x-8 my-1 sm:my-3 grid-cols-6">
          {arr.map((index) => {
            if (team.members[index]) {
              return (
                <Link
                  to={`/pokemon/${team.members[index]}`}
                  key={index}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${team.members[index]}.png`}
                    className="bg-gray1 rounded-full hover:ring-2 hover:ring-gray3"
                  />
                </Link>
              );
            } else {
              return (
                <img
                  key={index}
                  src={placeholder}
                  className="bg-gray1 rounded-full"
                />
              );
            }
          })}
        </span>
        <div className="flex gap-x-8">
          <IconBtn btnData={likeBtnData} />
          <IconBtn btnData={commentBtnData} />
        </div>
      </div>
      <div className="w-full">
        {repliesVisible && (
          <ReplyList
            replies={replies}
            user={user.username}
            kind={{ name: "team", id: team.id }}
          />
        )}
      </div>
    </Card>
  );
}

export default memo(TeamCard);
