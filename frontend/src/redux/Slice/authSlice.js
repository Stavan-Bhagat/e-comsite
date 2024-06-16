/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
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
  get_cart,
} from '../../constant/localStorage.constant';
// import { addCartData } from '../../utils/services/cart.service';

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
      state.error = null;
    },


    logout: async (state) => {
      try {
        const cartData = get_cart();
        // if (cartData) {
        //   await addCartData(state.user._id, cartData);
        // }
        remove_is_authenticated();
        remove_session_user();
        remove_token();

        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = null;
      } catch (error) {
        console.error('Failed to send cart data', error);
        state.error = 'Failed to save cart data';
      }

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

// import { createSlice } from '@reduxjs/toolkit';
// import {
//   set_session_user,
//   get_session_user,
//   remove_session_user,
//   set_is_authenticated,
//   remove_is_authenticated,
//   set_token,
//   get_is_authenticated,
//   get_token,
//   remove_token,
//   get_cart,
// } from '../../constant/localStorage.constant';
// // import { addCartData } from '../../utils/services/cart.service';

// const initialState = {
//   isAuthenticated: get_is_authenticated() ? get_is_authenticated() : false,
//   user: get_session_user() ? get_session_user() : null,
//   token: get_token() ? get_token() : null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.token = action.payload.accessToken;
//       state.loading = false;
//       state.error = null;
//       set_session_user(action.payload.user);
//       set_token(action.payload.token);
//       set_is_authenticated(true);
//     },

//     loginFailure: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       state.loading = false;
//       state.error = null;
//     },

//     // logout: (state) => {
//     //   const cartData = get_cart();
//     //   if (state.user && cartData) {
//     //     addCartData(state.user._id, cartData)
//     //       .then(() => {
//     //         remove_is_authenticated();
//     //         remove_session_user();
//     //         remove_token();

//     //         state.isAuthenticated = false;
//     //         state.user = null;
//     //         state.token = null;
//     //         state.loading = false;
//     //         state.error = null;
//     //       })
//     //       .catch((error) => {
//     //         console.error('Failed to save cart data', error);
//     //       });
//     //   } else {
//     //     remove_is_authenticated();
//     //     remove_session_user();
//     //     remove_token();

//     //     state.isAuthenticated = false;
//     //     state.user = null;
//     //     state.token = null;
//     //     state.loading = false;
//     //     state.error = null;
//     //   }
//     // },

//     updateUser: (state, action) => {
//       state.user = action.payload;
//       set_session_user(action.payload);
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout, updateUser } = authSlice.actions;
// export default authSlice.reducer;
