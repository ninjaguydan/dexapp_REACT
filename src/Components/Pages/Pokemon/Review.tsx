import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Avatar from "components/common/buttons/Avatar";
import ReplyList from "components/common/cards/ReplyList";
import { StarOutline, Star, HeartOutline, Heart, ChatOutline, Trash } from "components/common/icons/index";
import Loading from "components/common/loader/Loading";

import { getTimeDifference, titleCase, truncateStr } from "utils/Helpers";
import { IReview, IPokemon } from "utils/Interfaces";
import { RootState } from "redux/store";
import usePokemon from "hooks/usePokemon";

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
  const { pkmnData, isLoading }: { pkmnData: IPokemon; isLoading: boolean } = usePokemon(`${review.pkmn}`);
  const avatar = {
    img: user.user_img,
    name: user.username,
    color: user.bg_color,
    classList: "h-16 w-16",
  };

  function toggleLike() {
    if (currentUser.id === 0) {
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
          src={pkmnData.sprite_url}
          alt={`${pkmnData.name}'s official sprite`}
          style={{ backgroundColor: "#444" }}
        />
      ) : (
        <Avatar user={avatar} />
      )}

      <div className="content">
        <h4>
          <Link to={`/profile/${user.username}`}>{TL_view ? truncateStr(user.username) : truncateStr(user.name)}</Link>
          <span> {TL_view ? "reviewed" : truncateStr(user.username)}</span>
          {TL_view && <Link to={`/pokemon/${pkmnData.id}`}> {titleCase(pkmnData.name)}</Link>}
          <span className="date"> &#8226; {getTimeDifference(review.created)}</span>
          {currentUser?.id === review.added_by && (
            <button
              aria-label="delete"
              className="trash"
              onClick={() => dispatch({ type: "review/DELETE", reviewId: review.id })}>
              <Trash />
            </button>
          )}
        </h4>
        <span className="rating flex text-sm my-2 text-gray3">
          {arr.map((value, index) => {
            if (review.rating < index + 1) {
              return (
                <StarOutline
                  key={index}
                  className="mr-1"
                />
              );
            } else {
              return (
                <Star
                  key={index}
                  className="mr-1"
                />
              );
            }
          })}
        </span>
        <p>{review.content}</p>
        <div className="icon-container">
          <button
            className="fav"
            onClick={() => toggleLike()}>
            {currentUser && likes.find((like) => like.user === currentUser.id) ? (
              <Heart style={{ color: "#009df1" }} />
            ) : (
              <HeartOutline />
            )}
            {likes.length}
            <span className="sr-only">likes</span>
          </button>
          <button
            className="fav"
            onClick={() => {
              setRepliesVisible(!repliesVisible);
            }}>
            <ChatOutline />
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
