import axiosInstance from "./axios";

// current user
export const get_session_user = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const set_session_user = (setValue) => {
  return localStorage.setItem("user", JSON.stringify(setValue));
};
export const remove_session_user = () => {
  return localStorage.removeItem("user");
};
// is login
export const get_is_authenticated = () => {
  return localStorage.getItem("isAuthenticated");
};
export const set_is_authenticated = (setValue) => {
  return localStorage.setItem("isAuthenticated", setValue);
};
export const remove_is_authenticated = () => {
  return localStorage.removeItem("isAuthenticated");
};
//token
export const get_token = () => {
  return localStorage.getItem("token");
};
export const set_token = (setValue) => {
  return localStorage.setItem("token", setValue);
};
export const remove_token = () => {
  return localStorage.removeItem("token");
};
// orders
export const get_orders = () => {
  return localStorage.getItem("orders");
};
export const set_orders = (setValue) => {
  return localStorage.setItem("orders", setValue);
};
export const remove_orders = () => {
  return localStorage.removeItem("orders");
};
// cart
export const get_cart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};
export const set_cart = (setValue) => {
  return localStorage.setItem("cart", JSON.stringify(setValue));
};
export const remove_cart = () => {
  return localStorage.removeItem("cart");
};

//featch user data
export const fetchUserData = async () => {
  const response = await axiosInstance.get("/submit/fetch-userdata");
  return response.data;
};
//product
export const fetchProductData = async (page) => {
  const response = await axiosInstance.get(
    `/product/fetch-productdata?page=${page}&limit=8`
  );
  return response.data;
};
export const fetchProduct = async (id) => {
  const response = await axiosInstance.get(`/product/fetch-product/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await axiosInstance.get(
    `/product/fetch-productdata-by-category?category=${category}`
  );
  return response.data;
};

export const fetchCategoryProducts = async (category) => {
  const response = await axiosInstance.get(`/product/fetch-category-product`);
  return response.data;
};
// order
export const fetchAllOrders = async () => {
  return await axiosInstance.get("/order/fetch-order");
};
