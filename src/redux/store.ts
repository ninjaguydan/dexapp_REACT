import { configureStore } from "@reduxjs/toolkit";

import authReducer from "redux/slices/authSlice";
import likesReducer from "redux/slices/likeSlice";
import postReducer from "redux/slices/postSlice";
import replyReducer from "redux/slices/replySlice";
import reviewReducer from "redux/slices/reviewSlice";
import teamReducer from "redux/slices/teamSlice";
import usersReducer from "redux/slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    likes: likesReducer,
    posts: postReducer,
    replies: replyReducer,
    reviews: reviewReducer,
    teams: teamReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
