import axiosInstance from '../axios';

export const fetchAllOrders = async () => {
  return axiosInstance.get('/fusion/order/fetch-order');
};
export const fetchOrders = async () => {
  return axiosInstance.get('/fusion/order/fetch-orderr');
};
