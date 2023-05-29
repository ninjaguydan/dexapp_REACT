import { configureStore } from "@reduxjs/toolkit";
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
