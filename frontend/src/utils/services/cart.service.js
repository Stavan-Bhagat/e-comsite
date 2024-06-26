import axiosInstance from '../axios';

export const fetchCartData = async (userId) => {
  const response = await axiosInstance.get(`/fusion/cart/fetch-cart?userId=${userId}`);
  return response.data.cart;
};

export const addCartData = async (userId, cartData) => {
  try {
    const response = await axiosInstance.post(`/fusion/cart/add-to-cart?userId=${userId}`, {
      cartData,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add cart data', error);
    throw error;
  }
};

export const removeCartData = async (id) => {
  const response = await axiosInstance.delete(`/fusion/cart/remove-cart?id=${id}`);
  return response.data;
};
