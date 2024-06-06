import axiosInstance from "axios";

export const fetchAllOrders = async () => {
  return await axiosInstance.get("/fusion/order/fetch-order");
};
