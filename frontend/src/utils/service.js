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
//featc user data
export const fetchUserData = async () => {
  const response = await axiosInstance.get("/submit/fetch-userdata");
  return response.data;
};
//
export const fetchProductData = async () => {
  const response = await axiosInstance.get("/product/fetch-Productdata");
  return response.data;
};
