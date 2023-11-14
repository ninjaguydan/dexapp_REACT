import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { IPost } from "utils/Interfaces";

const initialState: IPost[] = [
  { id: 1, content: "What a cool site. Just missing some friends!", created: 1604322329404, added_by: 1, likes: [] },
  { id: 2, content: "I hate pikachu!", created: 1649163929404, added_by: 2, likes: [1] },
  { id: 3, content: "Old pokemon are the best!", created: 1647003929404, added_by: 1, likes: [2] },
  { id: 4, content: "Daniel is so cool", created: 1655179597085, added_by: 3, likes: [] },
  {
    id: 5,
    content: "On a Pokemon's profile page, you can click the image to see the official shiny artwork..!!",
    created: 1698289597085,
    added_by: 2,
    likes: [],
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
      state = state.filter((post) => post.id !== postId);
    },
  },
});

export default postSlice.reducer;

export const selectPostById = () =>
  createSelector(
    [(state: RootState) => state.posts, (state: RootState, userId: number | string) => userId],
    (posts, userId) => posts.filter((post) => post.added_by === userId)
  );
