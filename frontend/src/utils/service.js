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
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const set_cart = (setValue) => {
  return localStorage.setItem("cart", JSON.stringify(setValue));
};
export const remove_cart = () => {
  return localStorage.removeItem("cart");
};

// all api
//user data
export const fetchUserData = async () => {
  const response = await axiosInstance.get("/fusion/submit/fetch-user");
  return response.data;
};
export const updateUserData = async (id, data) => {
  const response = await axiosInstance.patch(
    `/submit/update-user?id=${id}`,
    data
  );
  return response.data;
};
export const deleteUserData = async (id) => {
  const response = await axiosInstance.delete(
    `/fusion/submit/delete-user?id=${id}`
  );
  return response.data;
};
export const loginUser = async (data) => {
  const response = await axiosInstance.post(`fusion/submit/login`, data);
  return response.data;
};
export const registerUser = async (data) => {
  const response = await axiosInstance.post("fusion/submit/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

//product
export const fetchProductData = async (page) => {
  const response = await axiosInstance.get(
    `/fusion/product/fetch-product-data?page=${page}&limit=8`
  );
  return response.data;
};
export const fetchProduct = async (id) => {
  const response = await axiosInstance.get(
    `/fusion/product/fetch-product/${id}`
  );
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await axiosInstance.get(
    `/fusion/product/fetch-product-by-category?category=${category}`
  );
  return response.data;
};

export const fetchCategoryProducts = async () => {
  const response = await axiosInstance.get(
    `/fusion/product/fetch-category-product`
  );
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(
    `/fusion/product/delete-product?id=${productId}`
  );
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await axiosInstance.patch(
    `/fusion/product/update-product`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
export const addProduct = async (data) => {
  const response = await axiosInstance.post(
    "/fusion/product/add-product",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// order
export const fetchAllOrders = async () => {
  return await axiosInstance.get("/fusion/order/fetch-order");
};
