import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "../Slice/authSlice";
import uiSlice from "../Slice/uiSlice";
import cartSlice from "../Slice/cartSlice";
import orderSlice from "../Slice/orderSlice"
const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  ui: uiSlice,
  order:orderSlice
}); 

const store = configureStore({
  reducer: rootReducer,
});

export default store;
