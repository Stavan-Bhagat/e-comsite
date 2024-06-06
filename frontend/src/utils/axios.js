import axios from "axios";
<<<<<<< HEAD
// import { logout } from "../store/authSlice";
// import store from "../store/store";
const { REACT_APP_BASEURL } = process.env;
const axiosInstance = axios.create({
  // baseURL: process.env.BASEURL,
  baseURL: REACT_APP_BASEURL,
=======
import { logout } from "../redux/Slice/authSlice";
import store from "../redux/store/store";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
>>>>>>> 05b6d1174ba67909855e3bc68ed92420157183e8
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers["refresh-token"] = refreshToken;
    }
    console.log("Request Interceptor:", config);
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log("Response Interceptor:", response);

    if (response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
    }
    return response;
  },
  async (error) => {
    console.error("Response Interceptor Error:", error);

    if (error.response && error.response.status === 419) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const refreshResponse = await axios.get(`${process.env.REACT_APP_BASEURL}/submit/refreshtoken`, {
          headers: { "refresh-token": refreshToken },
        });
        const newAccessToken = refreshResponse.data.accessToken;
        console.log("new token", newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        if (
          refreshError.response.status === 401 &&
          refreshError.response.data.message === "Refresh token has expired"
        ) {
          store.dispatch(logout());
        }
        return Promise.reject(error);
      }
    }
    const errorMessage = error.response.data.message;
    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
