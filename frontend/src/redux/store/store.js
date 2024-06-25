import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authSlice from '../Slice/authSlice';
import uiSlice from '../Slice/uiSlice';
import cartSlice from '../Slice/cartSlice';
import orderSlice from '../Slice/orderSlice';
import themeSlice from '../Slice/themeSlice';
import notificationsSlice from '../Slice/notificationSlice';
import buyNowSlice from '../Slice/buyNowSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  ui: uiSlice,
  order: orderSlice,
  theme: themeSlice,
  notifications: notificationsSlice,
  buyNow: buyNowSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
