import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  notification: null,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.loading = true;
      state.error = null;
      state.notification = null;
    },
    hideLoading: (state, action) => {
      state.loading = false;
      state.error = null;
      state.notification = null;
    },
    showError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.notification = null;
    },
    hideError: (state, action) => {
      state.loading = false;
      state.error = null;
      state.notification = null;
    },
  },
});

export const { loginSuccess, loginFailure } = uiSlice.actions;
export default uiSlice.reducer;
