import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";

import UserIcon from "./UserIcon";

import { getTimeDifference, truncateStr } from "../../Helpers/Helpers";
import { IReply } from "../../Helpers/Interfaces";
import { RootState } from "../../Redux/store";

interface IReplyProps {
  reply: IReply;
}

function Reply({ reply }: IReplyProps) {
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
          <Link to={`/profile/${user.username}`}>{truncateStr(user.name)}</Link>
          <span> {truncateStr(user.username)}</span>
          <span className="date"> &#8226; {getTimeDifference(reply.created)}</span>
          {currentUser?.id === reply.added_by && (
            <button
              className="trash"
              onClick={() => dispatch({ type: "reply/DELETE", replyId: reply.id })}>
              <FaTrash />
              <span className="sr-only">delete</span>
            </button>
          )}
        </h4>
        <p>{reply.content}</p>
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
        </div>
      </div>
    </div>
  );
}

export default Reply;
