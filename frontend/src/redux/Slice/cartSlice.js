import { createSlice } from "@reduxjs/toolkit";
import { get_cart, set_cart, remove_cart } from "../../constant/localStorage.constant";

const initialState = {
  items: get_cart(),
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      state.totalQuantity++;
      state.totalAmount += newItem.sellingPrice;
      if (!existingItem) {
        state.items.push({
          _id: newItem._id,
          productName: newItem.productName,
          productImage: newItem.productImage,
          quantity: 1,
          sellingPrice: newItem.sellingPrice,
        });
        set_cart(state.items);
      } else {
        existingItem.quantity++;
        set_cart(state.items);
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.sellingPrice * existingItem.quantity;
        state.items = state.items.filter((item) => item._id !== id);
        set_cart(state.items);
      }
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount += (quantity - existingItem.quantity) * existingItem.sellingPrice;
        existingItem.quantity = quantity;
      }
      set_cart(state.items);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      remove_cart();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
