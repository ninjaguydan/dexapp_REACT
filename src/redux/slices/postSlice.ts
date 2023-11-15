import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { IPost } from "utils/Interfaces";

const initialState: IPost[] = [
  { id: 1, content: "What a cool site. Just missing some friends!", created: 1604322329404, added_by: 1, likes: [] },
  { id: 2, content: "I hate pikachu!", created: 1649163929404, added_by: 2, likes: [3, 1, 2] },
  { id: 3, content: "Old pokemon are the best!", created: 1647003929404, added_by: 1, likes: [] },
  { id: 4, content: "Daniel is so cool", created: 1655179597085, added_by: 3, likes: [] },
  {
    id: 5,
    content: "On a Pokemon's profile page, you can click the image to see the official shiny artwork..!!",
    created: 1698289597085,
    added_by: 2,
    likes: [1, 2, 3, 10],
  },
  {
    id: 6,
    content: "Hello World!",
    created: 1699400000000,
    added_by: 10,
    likes: [],
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    post_CREATE(state, action: PayloadAction<IPost>) {
      const newPost = action.payload;
      state.push(newPost);
    },
    post_DELETE(state, action: PayloadAction<number | string>) {
      const postId = action.payload;
      return state.filter((post) => post.id !== postId);
    },
    post_LIKE(state, action: PayloadAction<{ postId: number | string; userId: number | string }>) {
      const { postId, userId } = action.payload;
      const likedPost = state.find((post) => post.id === postId);
      if (likedPost) {
        likedPost.likes.push(userId);
      }
    },
    post_UNLIKE(state, action: PayloadAction<{ postId: number | string; userId: number | string }>) {
      const { postId, userId } = action.payload;
      const unlikedPost = state.find((post) => post.id === postId);
      if (unlikedPost) {
        unlikedPost.likes = unlikedPost.likes.filter((like) => like !== userId);
      }
    },
  },
});

export const { post_CREATE, post_DELETE, post_LIKE, post_UNLIKE } = postSlice.actions;
export default postSlice.reducer;

export const selectPostById = () =>
  createSelector(
    [(state: RootState) => state.posts, (state: RootState, userId: number | string) => userId],
    (posts, userId) => posts.filter((post) => post.added_by === userId)
  );
