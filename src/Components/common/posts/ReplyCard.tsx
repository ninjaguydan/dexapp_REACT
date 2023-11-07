import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/common/cards/Card";

import useLikes from "hooks/dispatch/useLikes";
import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, truncateStr } from "utils/Helpers";
import { IReply } from "utils/Interfaces";

interface Props {
  reply: IReply;
}

function ReplyCard({ reply }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === reply.added_by)[0]);
  const likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "reply" && like.forId === reply.id)
  );
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const toggleLike = useLikes(currentUser.id, likes, "reply", reply.id) as () => void;

  const deleteBtnData = {
    label: ICON_KEY.DELETE,
    content: "",
    action: () => dispatch({ type: "reply/DELETE", replyId: reply.id }),
    state: true,
  };

  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: likes.length,
    action: () => toggleLike(),
    state: currentUser && !!likes.find((like) => like.user === currentUser.id),
  };

  let node = (
    <>
      <Avatar
        user={user}
        classList="w-10 h-10"
      />
      <div className="flex flex-col gap-y-1 w-[calc(100%-80px)]">
        <h3 className="font-bold text-sm sm:text-base">
          <Link
            to={`/profile/${user.username}`}
            className="hover:underline">
            {truncateStr(user.name)}
          </Link>
          <span className="text-gray4 font-normal"> {truncateStr(user.username)}</span>
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(reply.created)}</span>
          {currentUser?.id === reply.added_by && <IconBtn btnData={deleteBtnData} />}
        </h3>
        <p className="text-xs sm:text-sm">{reply.content}</p>
        <div className="flex gap-x-8">
          <IconBtn btnData={likeBtnData} />
        </div>
      </div>
    </>
  );

  return (
    <Card
      children={node}
      classList="first:mt-2 first:sm:mt-4 !bg-gray1"
    />
  );
}

export default ReplyCard;
