/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
// /* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
// import { addToCart, removeFromCart, clearCart } from '../../redux/Slice/cartSlice';
// import { get_cart, set_cart, remove_cart } from '../../constant/localStorage.constant';

const axiosInstance = await import('../axios');

const dispatch = useDispatch();

export const fetchCartData = async () => {
  const response = await axiosInstance.get(`/fusion/cart/fetch-cart`);
  //   dispatch(addToCart(response.data));
  //   return response.data;
};

export const addCartData = async (userId, cartData) => {
  console.log('ccccccccccccc', userId, cartData);
  try {
    // const response = await axiosInstance.post(`/your-api-endpoint/cart/${userId}`, { cartData });
    // return response.data;
    return cartData;
  } catch (error) {
    console.error('Failed to add cart data', error);
    throw error;
  }
};

export const removeCartData = async (id) => {
  const response = await axiosInstance.delete(`/fusion/cart/remove-cart?id=${id}`);
  return response.data;
};
