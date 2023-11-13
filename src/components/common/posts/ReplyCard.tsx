import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";
import { RootState } from "redux/store";
import { useState } from "react";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import DeletePost from "components/common/modals/DeletePost";

import Card from "components/modules/Card";

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
  const currentUser = useAppSelector(selectCurrentUser);
  const toggleLike = useLikes(currentUser.userInfo.id, likes, "reply", reply.id) as () => void;
  const [showPopup, setShowPopup] = useState(false);

  const deleteBtnData = {
    label: ICON_KEY.DELETE,
    content: "",
    action: () => setShowPopup(true),
    state: true,
    classList: "absolute top-4 right-4",
  };

  const likeBtnData = {
    label: ICON_KEY.LIKES,
    content: likes.length,
    action: () => toggleLike(),
    state: currentUser && !!likes.find((like) => like.user === currentUser.userInfo.id),
  };

  return (
    <Card classList="first:mt-2 first:sm:mt-4 !bg-gray1">
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
          {currentUser.userInfo.id === reply.added_by && <IconBtn btnData={deleteBtnData} />}
        </h3>
        <p className="text-xs sm:text-sm">{reply.content}</p>
        <div className="flex gap-x-8">
          <IconBtn btnData={likeBtnData} />
        </div>
      </div>
      {showPopup && (
        <DeletePost
          onClose={() => {
            setShowPopup(false);
          }}
          onConfirm={() => dispatch({ type: "reply/DELETE", replyId: reply.id })}
          label="comment"
        />
      )}
    </Card>
  );
}

export default ReplyCard;
