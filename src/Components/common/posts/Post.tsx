import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/common/cards/Card";
import ReplyList from "components/common/cards/ReplyList";

import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, truncateStr } from "utils/Helpers";
import { IPost } from "utils/Interfaces";
import { RootState } from "redux/store";

interface IPostProps {
  post: IPost;
}

function Post({ post }: IPostProps) {
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "post" && reply.forId === post.id)
  );
  let user = useSelector((state: RootState) => state.users.filter((user) => user.id === post.added_by)[0]);
  let likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "post" && like.forId === post.id)
  );
  let currentUser = useSelector((state: RootState) => state.loggedUser);
  let dispatch = useDispatch();

  const avatar = {
    img: user.user_img,
    name: user.username,
    color: user.bg_color,
    classList: "h-16 w-16",
  };
  const deleteBtnData = {
    label: ICON_KEY.DELETE,
    content: "",
    action: () => dispatch({ type: "post/DELETE", postId: post.id }),
    state: true,
  };
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

  function toggleLike() {
    if (currentUser.id === 0) {
      return;
    }
    if (likes.find((like) => like.user === currentUser.id)) {
      let toDel = { name: "post", forId: post.id, user: currentUser.id };
      dispatch({ type: "users/UNLIKE", toDel });
    } else {
      let newLike = { postType: "post", user: currentUser.id, forId: post.id };
      dispatch({ type: "users/LIKE", newLike });
    }
  }

  let node = (
    <>
      <Avatar user={avatar} />
      <div className="flex flex-col gap-y-1">
        <h2 className="font-bold ">
          <Link
            to={`/profile/${truncateStr(user.username)}`}
            className="hover:underline">
            {truncateStr(user.name)}
          </Link>
          <span className="text-gray4 font-normal"> {truncateStr(user.username)}</span>
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(post.created)}</span>
          {currentUser?.id === post.added_by && <IconBtn btnData={deleteBtnData} />}
        </h2>
        <p className="text-sm">{post.content}</p>
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
    </>
  );

  return <Card children={node} />;
}

export default Post;
