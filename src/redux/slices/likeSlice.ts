import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILike } from "utils/Interfaces";

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
      state.push(like);
    },
    like_REMOVE(state, action) {
      const { postType, userId, forId } = action.payload;
      state = state.filter((like) => {
        if (like.postType !== postType || like.user !== userId) return like;
        return like.forId !== forId;
      });
    },
  },
});

export default likeSlice.reducer;
