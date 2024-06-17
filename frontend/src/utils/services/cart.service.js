/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// import { useSelector, useDispatch } from 'react-redux';
// import { addToCart, removeFromCart, clearCart } from '../../redux/Slice/cartSlice';
import { get_cart, set_cart, remove_cart } from '../../constant/localStorage.constant';

import axiosInstance from '../axios';

// const dispatch = useDispatch();

export const fetchCartData = async () => {
  const response = await axiosInstance.get(`/fusion/cart/fetch-cart`);
  console.log('res', response);
  set_cart(response.data);
  // dispatch(addToCart(response.data));
  //   return response.data;
};

export const addCartData = async (userId, cartData) => {
  console.log('addcartdata', userId, cartData);

  try {
    const response = await axiosInstance.post(`/fusion/cart/add-to-cart?userId=${userId}`, {
      cartData,
    });
    console.log('cart ka response', response.data);
    console.log('addcartdata', userId, cartData);
    return response.data;
    // return cartData;
  } catch (error) {
    console.error('Failed to add cart data', error);
    throw error;
  }
};

export const removeCartData = async (id) => {
  const response = await axiosInstance.delete(`/fusion/cart/remove-cart?id=${id}`);
  return response.data;
};
