import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart, FaHeart, FaRegCommentAlt, FaTrash } from "react-icons/fa";

import ReplyList from "../../Layout/ReplyList";
import UserIcon from "../../Layout/UserIcon";

import { getTimeDifference, truncateStr } from "../../../Helpers/Helpers";
import { IPost } from "../../../Helpers/Interfaces";
import { RootState } from "../../../Redux/store";

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

  return (
    <div className="card">
      <UserIcon
        userImg={user.user_img}
        userName={user.username}
        userColor={user.bg_color}
        mobileNav={""}
      />
      <div className="content">
        <h4>
          <Link to={`/profile/${truncateStr(user.username)}`}>{truncateStr(user.name)}</Link>
          <span> {truncateStr(user.username)}</span>
          <span className="date"> &#8226; {getTimeDifference(post.created)}</span>
          {currentUser?.id === post.added_by && (
            <button
              className="trash"
              onClick={() => dispatch({ type: "post/DELETE", postId: post.id })}>
              <FaTrash />
              <span className="sr-only">delete</span>
            </button>
          )}
        </h4>
        <p>{post.content}</p>
        <div className="icon-container">
          <button
            className="fav"
            onClick={() => toggleLike()}>
            {currentUser && likes.find((like) => like.user === currentUser.id) ? (
              <FaHeart style={{ color: "#009df1" }} />
            ) : (
              <FaRegHeart />
            )}
            {likes.length}
            <span className="sr-only">likes</span>
          </button>
          <button
            className="fav"
            onClick={() => {
              setRepliesVisible(!repliesVisible);
            }}>
            <FaRegCommentAlt />
            {replies.length}
            <span className="sr-only">comments</span>
          </button>
        </div>
      </div>
      <div className="replies">
        {repliesVisible && (
          <ReplyList
            replies={replies}
            user={user.username}
            kind={{ name: "post", id: post.id }}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
