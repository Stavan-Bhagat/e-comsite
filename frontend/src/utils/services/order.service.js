import axiosInstance from '../axios';

export const fetchAllOrders = async () => {
  return axiosInstance.get('/fusion/order/fetch-order');
};

export const fetchOrders = async (query, page) => {
  const response = await axiosInstance.get('/fusion/order/fetch-order', {
    params: { query, page, limit: 10 },
  });
  return response.data;
};
