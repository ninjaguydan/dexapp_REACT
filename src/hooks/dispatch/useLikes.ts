import { useAppDispatch } from "hooks/hooks";
// import { useDispatch } from "react-redux";
// import { like_ADD, like_REMOVE } from "redux/slices/likeSlice";

import { ILike } from "utils/Interfaces";

function useLikes(userId: number | string, likes: ILike[], postType: string, forId: string | number) {
  // const dispatch = useAppDispatch();
  // if (userId === 0) return;
  // const ACTION = !!likes.find((like) => like.user === userId) ? "UNLIKE" : "LIKE";
  // let tempLike = { postType: postType, user: userId, forId: forId };
  // const toggleLike = () => {
  //   if (ACTION === "LIKE") dispatch(like_ADD({ ...tempLike }));
  //   else dispatch(like_REMOVE({ ...tempLike }));
  // };
  // return toggleLike;
}
export default useLikes;
