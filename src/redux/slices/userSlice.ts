import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "utils/Interfaces";

const initialState: IUser[] = [
  {
    userInfo: {
      id: 1,
      bio: "The very best.",
      pronouns: "He/Him",
      name: "Daniel Thompson",
      username: "danboy",
      password: "password",
      user_img: "m1",
      bg_color: "bg-primary",
      location: "Jackson, MS",
    },
    loading: false,
    userToken: null,
    error: null,
    success: false,
  },
  {
    loading: false,
    userToken: null,
    error: null,
    success: false,
    userInfo: {
      id: 2,
      bio: "This is a bio. I can put anything here. Gotta be respectful tho",
      name: "Josh Virgil",
      username: "joshwick420",
      password: "1234",
      user_img: "m2",
      bg_color: "bg-green",
    },
  },
  {
    loading: false,
    userToken: null,
    error: null,
    success: false,
    userInfo: {
      id: 3,
      name: "Kelsey J",
      username: "k_sheesh",
      password: "gggg",
      user_img: "f3",
      bg_color: "bg-yellow",
    },
  },
  {
    loading: false,
    userToken: null,
    error: null,
    success: false,
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
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    user_ADDED(state, action: PayloadAction<IUser>) {
      const newUser = action.payload;
      state.push(newUser);
    },
    user_UPDATE(state, action: PayloadAction<IUser>) {
      const updatedUser = action.payload;
      state = state.map((user) => {
        if (user.userInfo.id === updatedUser.userInfo.id) return updatedUser;
        return user;
      });
    },
  },
});

export default userSlice.reducer;
