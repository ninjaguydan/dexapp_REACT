import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/common/cards/Card";
import ReplyList from "components/common/posts/ReplyList";

import useLikes from "hooks/dispatch/useLikes";
import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, truncateStr } from "utils/Helpers";
import { IPost } from "utils/Interfaces";

interface IPostProps {
  post: IPost;
}

function Post({ post }: IPostProps) {
  const dispatch = useDispatch();
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "post" && reply.forId === post.id)
  );
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === post.added_by)[0]);
  const likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "post" && like.forId === post.id)
  );
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const toggleLike = useLikes(currentUser.id, likes, "post", post.id) as () => void;

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

  let node = (
    <>
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
          {currentUser?.id === post.added_by && <IconBtn btnData={deleteBtnData} />}
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
    </>
  );

  return <Card children={node} />;
}

export default Post;
