import { createSelector, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { ILike } from "utils/Interfaces";
import { RootState } from "redux/store";

const initialState: ILike[] = [
  { postType: "reply", user: 1, forId: 4 },
  { postType: "team", user: 1, forId: 1 },
  { postType: "post", user: 3, forId: 2 },
  { postType: "post", user: 1, forId: 2 },
  { postType: "post", user: 2, forId: 2 },
  { postType: "review", user: 1, forId: 4 },
  { postType: "post", user: 1, forId: 5 },
  { postType: "post", user: 2, forId: 5 },
  { postType: "post", user: 3, forId: 5 },
  { postType: "post", user: 10, forId: 5 },
];

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    like_ADD(state, action) {
      const like = action.payload;
      console.log("adding like");
      state.push(like);
    },
    like_REMOVE(state, action) {
      const { postType, user, forId } = action.payload;
      return state.filter((like) => {
        if (like.postType !== postType || like.user !== user) {
          return like;
        } else {
          return like.forId !== forId;
        }
      });
    },
  },
});

export default likeSlice.reducer;
export const { like_ADD, like_REMOVE } = likeSlice.actions;

// Selectors
const selectLikes = (state: RootState) => state.likes;

export const MakeSelectLikesByReview = () =>
  createSelector([selectLikes, (state: RootState, reviewId: number | string) => reviewId], (likes, reviewId) =>
    likes.filter((like) => like.postType === "review" && like.forId === reviewId)
  );
export const MakeSelectLikesByPost = () =>
  createSelector([selectLikes, (state: RootState, postId: number | string) => postId], (likes, postId) =>
    likes.filter((like) => like.postType === "post" && like.forId === postId)
  );
export const MakeSelectLikesByReply = () =>
  createSelector([selectLikes, (state: RootState, replyId: number | string) => replyId], (likes, replyId) =>
    likes.filter((like) => like.postType === "reply" && like.forId === replyId)
  );
export const MakeSelectLikesByTeam = () =>
  createSelector([selectLikes, (state: RootState, teamId: number | string) => teamId], (likes, teamId) =>
    likes.filter((like) => like.postType === "team" && like.forId === teamId)
  );
