import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { RootState } from "redux/store";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";

import DeletePost from "components/common/modals/DeletePost";
import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import ReplyList from "components/common/posts/ReplyList";
import Card from "components/modules/Card";

import useLikes from "hooks/dispatch/useLikes";
import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, truncateStr } from "utils/Helpers";
import { IPost } from "utils/Interfaces";

import { makeSelectLikesBy } from "redux/slices/likeSlice";

interface IPostProps {
  post: IPost;
}

function Post({ post }: IPostProps) {
  const dispatch = useAppDispatch();
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  // get memoized likes
  const selectPostLikes = useMemo(makeSelectLikesBy, []);
  const likes = useAppSelector((state) => selectPostLikes(state.likes, { id: post.id, type: "post" }));
  // init state
  const [repliesVisible, setRepliesVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "post" && reply.forId === post.id)
  );
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === post.added_by)[0]);

  const toggleLike = useLikes(currentUser.userInfo.id, likes, "post", post.id) as () => void;

  const deleteBtnData = {
    label: ICON_KEY.DELETE,
    content: "",
    action: () => {
      setShowPopup(true);
    },
    state: true,
    classList: "absolute top-4 right-4",
  };
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

  console.log("Post render");

  return (
    <Card>
      <Avatar
        user={user}
        classList="h-10 sm:h-16 w-10 sm:w-16"
      />
      <div className="flex flex-col gap-y-1 w-[calc(100%-80px)]">
        <h2 className="font-bold text-sm sm:text-base">
          <Link
            to={`/profile/${truncateStr(user.username)}`}
            className="hover:underline">
            {truncateStr(user.name)}
          </Link>
          <span className="text-gray4 font-normal"> {truncateStr(user.username)}</span>
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(post.created)}</span>
          {currentUser.userToken === post.added_by && <IconBtn btnData={deleteBtnData} />}
        </h2>
        <p className="text-xs sm:text-sm">{post.content}</p>
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
            kind={{ name: "post", id: post.id }}
          />
        )}
      </div>
      {showPopup && (
        <DeletePost
          onClose={() => {
            setShowPopup(false);
          }}
          onConfirm={() => dispatch({ type: "post/DELETE", postId: post.id })}
          label="post"
        />
      )}
    </Card>
  );
}

export default Post;
