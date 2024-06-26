import { createSlice } from '@reduxjs/toolkit';
import {
  set_session_user,
  get_session_user,
  remove_session_user,
  set_is_authenticated,
  get_is_authenticated,
  remove_is_authenticated,
  set_token,
  get_token,
  remove_token,
} from '../../constant/localStorage.constant';

const initialState = {
  isAuthenticated: get_is_authenticated() ? get_is_authenticated() : false,
  user: get_session_user(),
  accessToken: get_token() ? get_token() : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.loading = false;
      state.error = null;
      set_session_user(action.payload.user);
      set_token(action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      set_is_authenticated(true);
    },

    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = 'Login failed';
    },

    logout: (state) => {
      state.isAuthenticated = remove_is_authenticated();
      state.user = remove_session_user();
      state.accessToken = remove_token();
      localStorage.removeItem('refreshToken');
      state.loading = false;
      state.error = null;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
      set_session_user(action.payload);
    },
  },
});

export const { loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
