import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { selectCurrentUser } from "redux/slices/authSlice";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import { StarOutline, Star } from "components/common/icons/index";
import DeletePost from "components/common/modals/DeletePost";
import ReplyList from "components/common/posts/ReplyList";

import Spinner from "components/modules/Spinner";
import Card from "components/modules/Card";

import useFetchPkmn from "hooks/fetchers/useFetchPkmn";
import useLikes from "hooks/dispatch/useLikes";

import setImage from "utils/setDefaultImg";
import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, titleCase, truncateStr } from "utils/Helpers";
import { IReview } from "utils/Interfaces";

import { makeSelectLikesBy } from "redux/slices/likeSlice";

interface Props {
  review: IReview;
  TL_view: boolean;
}

const setRating = (rating: number) => {
  const arr = [...Array(10).keys()];

  return arr.map((value, index) => {
    if (rating < index + 1) {
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
  });
};

const Review = ({ review, TL_view = false }: Props) => {
  const dispatch = useAppDispatch();
  // logged in user
  const currentUser = useAppSelector(selectCurrentUser);
  // get memoized likes
  const selectReviewLikes = useMemo(makeSelectLikesBy, []);
  const likes = useAppSelector((state) => selectReviewLikes(state.likes, { id: review.id, type: "review" }));
  // init state
  const [repliesVisible, setRepliesVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "review" && reply.forId === review.id)
  );
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === review.added_by)[0]);

  const { data: pkmnData, isLoading }: { data?: { name: string; id: number }; isLoading: boolean } = useFetchPkmn(
    review.pkmn
  );
  const toggleLike = useLikes(currentUser.userInfo.id, likes, "review", review.id) as () => void;

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

  if (isLoading || !pkmnData) {
    return <Spinner />;
  }

  console.log("Review render");

  return (
    <Card>
      {TL_view ? (
        <Link to={`/pokemon/${pkmnData.id}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkmnData.id}.png`}
            alt={`${pkmnData.name}'s official sprite`}
            className="bg-gray1 rounded-full w-10 h-10 sm:w-16 sm:h-16"
            onError={(e) => {
              setImage(e);
            }}
          />
        </Link>
      ) : (
        <Avatar
          user={user}
          classList="w-10 h-10 sm:w-16 sm:h-16"
        />
      )}

      <div className="flex flex-col gap-y-1 w-[calc(100%-80px)]">
        <h2 className="font-bold text-sm sm:text-base">
          <Link
            to={`/profile/${user.username}`}
            className="hover:underline">
            {TL_view ? truncateStr(user.username) : truncateStr(user.name)}
          </Link>
          <span className="text-gray4 font-normal"> {TL_view ? "reviewed" : truncateStr(user.username)}</span>
          {TL_view && (
            <Link
              to={`/pokemon/${pkmnData.id}`}
              className="hover:underline">
              {" "}
              {titleCase(pkmnData.name)}
            </Link>
          )}
          <span className="text-gray4 font-normal italic text-xs"> &#8226; {getTimeDifference(review.created)}</span>
          {currentUser.userToken === review.added_by && <IconBtn btnData={deleteBtnData} />}
        </h2>
        <span className="flex text-xs sm:text-sm my-1 sm:my-2 text-gray3">{setRating(review.rating)}</span>
        <p className="text-xs sm:text-sm">{review.content}</p>
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
            kind={{ name: "review", id: review.id }}
          />
        )}
      </div>
      {showPopup && (
        <DeletePost
          onClose={() => {
            setShowPopup(false);
          }}
          onConfirm={() => dispatch({ type: "review/DELETE", reviewId: review.id })}
          label="review"
        />
      )}
    </Card>
  );
};

export default Review;
