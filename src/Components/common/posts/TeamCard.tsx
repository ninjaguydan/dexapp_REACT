import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { Link } from "react-router-dom";

import ReplyList from "components/common/posts/ReplyList";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/common/cards/Card";

import useLikes from "hooks/dispatch/useLikes";

import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference } from "utils/Helpers";
import { ITeam } from "utils/Interfaces";

interface ITeamProps {
  team: ITeam;
}

function Team({ team }: ITeamProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === team.added_by)[0]);
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "team" && reply.forId === team.id)
  );
  const likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "team" && like.forId === team.id)
  );
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const toggleLike = useLikes(currentUser.id, likes, "team", team.id) as () => void;

  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: likes.length,
    action: () => toggleLike(),
    state: currentUser && !!likes.find((like) => like.user === currentUser.id),
  };

  const commentBtnData = {
    label: ICON_KEY.COMMENTS,
    content: replies.length,
    action: () => {
      setRepliesVisible(!repliesVisible);
    },
    state: false,
  };

  let node = (
    <>
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
            className="hover:underline">
            {" "}
            {team.name}
          </Link>
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(team.created)}</span>
        </h2>
        <span className="grid gap-x-4 lg:sm:gap-x-8 my-1 sm:my-3 grid-cols-6">
          {team.members.map((value) => {
            return (
              <Link
                to={`/pokemon/${value}`}
                key={value}>
                <img
                  className="bg-gray1 rounded-full hover:ring-2 hover:ring-gray3"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`}
                />
              </Link>
            );
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
    </>
  );

  return <Card children={node} />;
}

export default Team;
