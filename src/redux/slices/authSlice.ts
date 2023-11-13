import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "utils/Interfaces";

const initialState: IUser = {
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
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth_LOGIN(state, action: PayloadAction<IUser>) {
      const user_to_login = action.payload;
      state = user_to_login;
    },
    auth_LOGOUT(state, action: PayloadAction<IUser>) {
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
