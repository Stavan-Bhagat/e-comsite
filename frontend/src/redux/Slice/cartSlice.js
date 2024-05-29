import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array to store cart items
  totalQuantity: 0, // Total quantity of items in the cart
  totalPrice: 0, // Total price of items in the cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === product.productId
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }

      state.totalQuantity += quantity;
      state.totalPrice += product.price * quantity;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;

      const itemIndex = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex !== -1) {
        const removedItem = state.items.splice(itemIndex, 1)[0];

        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.product.price * removedItem.quantity;
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      const itemIndex = state.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex !== -1) {
        const oldQuantity = state.items[itemIndex].quantity;
        state.items[itemIndex].quantity = quantity;

        state.totalQuantity += quantity - oldQuantity;
        state.totalPrice +=
          (quantity - oldQuantity) * state.items[itemIndex].product.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
