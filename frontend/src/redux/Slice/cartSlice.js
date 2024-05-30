import { createSlice } from "@reduxjs/toolkit";
import { get_cart, set_cart, remove_cart } from "../../utils/service";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem.id);

      state.totalQuantity++;
      state.totalAmount += newItem.sellingPrice;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          productName: newItem.productName,
          productImage: newItem.productImage,
          quantity: 1,
          sellingPrice: newItem.sellingPrice,
        });
      } else {
        existingItem.quantity++;
      }
      set_cart(state.items);
    },
    removeFromCart(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.sellingPrice * existingItem.quantity;
        state.items = state.items.filter((item) => item._id !== id);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount +=
          (quantity - existingItem.quantity) * existingItem.sellingPrice;
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      remove_cart();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
