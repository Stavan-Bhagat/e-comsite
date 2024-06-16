/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  get_notification,
  set_notification,
  remove_notification,
} from '../../constant/localStorage.constant';

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: get_notification(),
    unreadCount: get_notification().length,
  },
  reducers: {
    addNotification: (state, action) => {
      state.items.push(action.payload);
      state.unreadCount += 1;
      set_notification(state.items);
    },
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
      remove_notification();
    },
  },
});

export const { addNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
