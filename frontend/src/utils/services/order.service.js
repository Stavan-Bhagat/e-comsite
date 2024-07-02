import axiosInstance from '../axios';

export const fetchAllOrders = async () => {
  return axiosInstance.get('/fusion/order/fetch-order');
};

export const fetchOrders = async (query, page, user) => {
  const response = await axiosInstance.get('/fusion/order/fetch-order', {
    params: { query, page, limit: 10, user },
  });
  return response.data;
};
