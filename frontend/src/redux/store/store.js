import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../authSlice";
import uiSlice from "../uiSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
