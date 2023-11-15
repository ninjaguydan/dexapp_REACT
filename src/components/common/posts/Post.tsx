import { useState, useMemo, memo } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "hooks/hooks";

import DeletePost from "components/common/modals/DeletePost";
import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import ReplyList from "components/common/posts/ReplyList";
import Card from "components/modules/Card";

import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, truncateStr } from "utils/Helpers";
import { IPost } from "utils/Interfaces";

import { selectCurrentUser } from "redux/slices/authSlice";
import { post_DELETE, post_LIKE, post_UNLIKE } from "redux/slices/postSlice";
import { makeSelectRepliesByPost, reply_DESTROY_ALL_BY_ } from "redux/slices/replySlice";

interface IPostProps {
  post: IPost;
}

function Post({ post }: IPostProps) {
  const dispatch = useAppDispatch();
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  // get memoized replies
  const selectPostReplies = useMemo(makeSelectRepliesByPost, []);
  const replies = useAppSelector((state) => selectPostReplies(state, post.id));
  // init state
  const [repliesVisible, setRepliesVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const user = useAppSelector((state) => state.users.filter((user) => user.id === post.added_by)[0]);

  const toggleLike = () => {
    const payload = { postId: post.id, userId: currentUser.userInfo.id };
    if (post.likes.includes(currentUser.userInfo.id)) {
      dispatch(post_UNLIKE(payload));
    } else {
      dispatch(post_LIKE(payload));
    }
  };

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
    content: post.likes.length,
    action: () => toggleLike(),
    state: !!currentUser.userToken && !!post.likes.find((like) => like === currentUser.userInfo.id),
  };
  const commentBtnData = {
    label: ICON_KEY.COMMENTS,
    content: replies.length,
    action: () => {
      setRepliesVisible(!repliesVisible);
    },
    state: false,
  };

  console.count("Post card");

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
          {currentUser.userInfo.id === post.added_by && <IconBtn btnData={deleteBtnData} />}
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
          onConfirm={() => {
            dispatch(post_DELETE(post.id));
            dispatch(reply_DESTROY_ALL_BY_({ id: post.id, type: "post" }));
          }}
          label="post"
        />
      )}
    </Card>
  );
}

export default memo(Post);
