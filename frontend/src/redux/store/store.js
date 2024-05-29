import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../Slice/authSlice";
import uiSlice from "../Slice/uiSlice";
import cartSlice from "../Slice/cartSlice";
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  ui: uiSlice,
}); 

const store = configureStore({
  reducer: rootReducer,
});

export default store;
