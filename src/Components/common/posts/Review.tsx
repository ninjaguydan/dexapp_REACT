import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "redux/store";

import Avatar from "components/common/buttons/Avatar";
import IconBtn from "components/common/buttons/IconBtn";
import Card from "components/modules/Card";
import ReplyList from "components/common/posts/ReplyList";
import Loading from "components/common/loader/Loading";

import usePokemon from "hooks/fetchers/usePokemon";

import useLikes from "hooks/dispatch/useLikes";
import { ICON_KEY } from "utils/iconKey";
import { getTimeDifference, titleCase, truncateStr } from "utils/Helpers";
import { IReview, IPokemon } from "utils/Interfaces";

import { StarOutline, Star } from "components/common/icons/index";

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
  const dispatch = useDispatch();
  const [repliesVisible, setRepliesVisible] = useState(false);
  const replies = useSelector((state: RootState) =>
    state.replies.filter((reply) => reply.for === "review" && reply.forId === review.id)
  );
  const user = useSelector((state: RootState) => state.users.filter((user) => user.id === review.added_by)[0]);
  const likes = useSelector((state: RootState) =>
    state.likes.filter((like) => like.postType === "review" && like.forId === review.id)
  );
  const currentUser = useSelector((state: RootState) => state.loggedUser);
  const { pkmnData, isLoading }: { pkmnData: IPokemon; isLoading: boolean } = usePokemon(`${review.pkmn}`);
  const toggleLike = useLikes(currentUser.id, likes, "review", review.id) as () => void;

  const deleteBtnData = {
    label: ICON_KEY.DELETE,
    content: "",
    action: () => dispatch({ type: "review/DELETE", reviewId: review.id }),
    state: true,
    classList: "absolute top-4 right-4",
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card>
      {TL_view ? (
        <Link to={`/pokemon/${pkmnData.id}`}>
          <img
            src={pkmnData.sprite_url}
            alt={`${pkmnData.name}'s official sprite`}
            className="bg-gray1 rounded-full w-10 h-10 sm:w-16 sm:h-16"
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
          {currentUser?.id === review.added_by && <IconBtn btnData={deleteBtnData} />}
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
    </Card>
  );
};

export default Review;
