import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { IAuthUser } from "utils/Interfaces";

const initialState: IAuthUser = {
  loading: false,
  userInfo: {
    id: 10,
    bio: "I am an anonymous user. Change whatever you like, or make a new account!",
    location: "",
    pronouns: "",
    name: "John Doe",
    username: "anon10",
    password: "password",
    user_img: "dfault",
    bg_color: "bg-black",
  },
  userToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_LOGIN(state, action: PayloadAction<IAuthUser>) {
      const user_to_login = action.payload;
      state = user_to_login;
    },
    auth_LOGOUT(state, action: PayloadAction<IAuthUser>) {
      state = {
        loading: false,
        userToken: null,
        error: null,
        success: false,
        userInfo: {
          id: 0,
          bio: "",
          location: "",
          pronouns: "",
          name: "",
          username: "",
          password: "",
          user_img: "",
          bg_color: "",
        },
      };
    },
  },
});
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth;
