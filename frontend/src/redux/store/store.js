import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../Slice/authSlice";
import uiSlice from "../Slice/uiSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  ui: uiSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
