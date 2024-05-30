// src/redux/Slice/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderDetails: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder(state, action) {
      console.log("place order",action.payload);
      state.orderDetails = action.payload;
    },
  },
});

export const { placeOrder } = orderSlice.actions;

export default orderSlice.reducer;
