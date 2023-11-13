import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";
import { RootState } from "redux/store";
import { Link } from "react-router-dom";

import placeholder from "media/0.png";

import ReplyList from "components/common/posts/ReplyList";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/modules/Card";

import useLikes from "hooks/dispatch/useLikes";

import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference } from "utils/Helpers";
import { ITeam } from "utils/Interfaces";
import { makeSelectLikesBy } from "redux/slices/likeSlice";

interface ITeamProps {
  team: ITeam;
}

function TeamCard({ team }: ITeamProps) {
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  // get memoized likes
  const selectTeamLikes = useMemo(makeSelectLikesBy, []);
  const likes = useAppSelector((state) => selectTeamLikes(state.likes, { id: team.id, type: "team" }));

  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "team" && reply.forId === team.id)
  );
  const toggleLike = useLikes(currentUser.userInfo.id, likes, "team", team.id) as () => void;
  const arr = [...Array(6).keys()];

  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: likes.length,
    action: () => toggleLike(),
    state: !!currentUser.userToken && !!likes.find((like) => like.user === currentUser.userInfo.id),
  };

  const commentBtnData = {
    label: ICON_KEY.COMMENTS,
    content: replies.length,
    action: () => {
      setRepliesVisible(!repliesVisible);
    },
    state: false,
  };

  console.log("TeamCard render");

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

export default TeamCard;
