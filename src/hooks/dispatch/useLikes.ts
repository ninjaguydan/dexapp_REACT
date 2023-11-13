import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { ILike } from "utils/Interfaces";

function useLikes(userId: number | string, likes: ILike[], postType: string, forId: string | number) {
  const dispatch = useDispatch();

  if (userId === 0) return;

  const ACTION = !!likes.find((like) => like.user === userId) ? "UNLIKE" : "LIKE";
  let tempLike = { postType: postType, user: userId, forId: forId };

  const toggleLike = () => {
    dispatch({ type: `users/${ACTION}`, tempLike });
  };
  return toggleLike;
}
export default useLikes;