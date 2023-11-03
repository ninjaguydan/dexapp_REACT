import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Heart, HeartOutline, Trash } from "components/common/icons/index";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/common/cards/Card";

import { ICON_KEY } from "data/iconKey";
import { getTimeDifference, truncateStr } from "utils/Helpers";
import { IReply } from "utils/Interfaces";
import { RootState } from "redux/store";

interface IReplyProps {
  reply: IReply;
}

function ReplyCard({ reply }: IReplyProps) {
  let dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.users.filter((user) => user.id === reply.added_by)[0]);
  let likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "reply" && like.forId === reply.id)
  );
  let currentUser = useSelector((state: RootState) => state.loggedUser);

  function toggleLike() {
    if (currentUser.id === 0) {
      return;
    }
    if (likes.find((like) => like.user === currentUser.id)) {
      let toDel = { name: "reply", forId: reply.id, user: currentUser.id };
      dispatch({ type: "users/UNLIKE", toDel });
    } else {
      let newLike = { postType: "reply", user: currentUser.id, forId: reply.id };
      dispatch({ type: "users/LIKE", newLike });
    }
  }

  const avatar = {
    img: user.user_img,
    name: user.username,
    color: user.bg_color,
    classList: "w-10 h-10",
  };

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
      <Avatar user={avatar} />
      <div className="flex flex-col gap-y-1">
        <h4 className="font-bold">
          <Link
            to={`/profile/${user.username}`}
            className="hover:underline">
            {truncateStr(user.name)}
          </Link>
          <span className="text-gray4 font-normal"> {truncateStr(user.username)}</span>
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(reply.created)}</span>
          {currentUser?.id === reply.added_by && <IconBtn btnData={deleteBtnData} />}
        </h4>
        <p className="text-sm">{reply.content}</p>
        <div className="flex gap-x-8">
          <IconBtn btnData={likeBtnData} />
        </div>
      </div>
    </>
  );

  return (
    <Card
      children={node}
      classList="first:mt-4 bg-gray1"
    />
  );
}

export default ReplyCard;
