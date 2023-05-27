import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar, FaHeart, FaRegHeart, FaRegCommentAlt, FaTrash } from "react-icons/fa";

import ReplyList from "../../Layout/ReplyList";
import Loading from "../../Loader/Loading";
import UserIcon from "../../Layout/UserIcon";

import { getTimeDifference, titleCase, truncateStr } from "../../../Helpers/Helpers";
import usePokemon from "../../../CustomHooks/usePokemon";
import { IReview, IPokemon } from "../../../Helpers/Interfaces";
import { RootState } from "../../../Redux/store";

interface IReviewProps {
  review: IReview;
  TL_view: boolean;
}

const Review = ({ review, TL_view = false }: IReviewProps) => {
  let dispatch = useDispatch();
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "review" && reply.forId === review.id)
  );
  const arr = [...Array(10).keys()];
  let user = useSelector((state: RootState) => state.users.filter((user) => user.id === review.added_by)[0]);
  let likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "review" && like.forId === review.id)
  );
  let currentUser = useSelector((state: RootState) => state.loggedUser);
  const { data: pkmn, isLoading }: { data: IPokemon; isLoading: boolean } = usePokemon(review.pkmn);

  function toggleLike() {
    if (!currentUser) {
      return;
    }
    if (likes.find((like) => like.user === currentUser.id)) {
      let toDel = { name: "review", forId: review.id, user: currentUser.id };
      dispatch({ type: "users/UNLIKE", toDel });
    } else {
      let newLike = { postType: "review", user: currentUser.id, forId: review.id };
      dispatch({ type: "users/LIKE", newLike });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card">
      {TL_view ? (
        <img
          src={pkmn.sprite_url}
          alt={`${pkmn.name}'s official sprite`}
          style={{ backgroundColor: "#444" }}
        />
      ) : (
        <UserIcon
          userImg={user.user_img}
          userName={user.username}
          userColor={user.bg_color}
          mobileNav=""
        />
      )}

      <div className="content">
        <h4>
          <Link to={`/profile/${user.username}`}>{TL_view ? truncateStr(user.username) : truncateStr(user.name)}</Link>
          <span> {TL_view ? "reviewed" : truncateStr(user.username)}</span>
          {TL_view && <Link to={`/pokemon/${pkmn.id}`}> {titleCase(pkmn.name)}</Link>}
          <span className="date"> &#8226; {getTimeDifference(review.created)}</span>
          {currentUser?.id === review.added_by && (
            <button
              className="trash"
              onClick={() => dispatch({ type: "review/DELETE", reviewId: review.id })}>
              <FaTrash />
              <span className="sr-only">delete</span>
            </button>
          )}
        </h4>
        <span className="rating">
          {arr.map((value, index) => {
            if (review.rating < index + 1) {
              return <FaRegStar key={index} />;
            } else {
              return <FaStar key={index} />;
            }
          })}
        </span>
        <p>{review.content}</p>
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
            kind={{ name: "review", id: review.id }}
          />
        )}
      </div>
    </div>
  );
};

export default Review;
