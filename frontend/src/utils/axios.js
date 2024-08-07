import axios from 'axios';
import { logout } from '../redux/Slice/authSlice';
import store from '../redux/store/store';
const baseUrl = process.env.REACT_APP_BASEURL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      newConfig.headers['refresh-token'] = refreshToken;
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.data.accessToken;
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
    }
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response && response.status === 419) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await axios.get(`${baseUrl}/fusion/submit/refreshtoken`, {
          headers: { 'refresh-token': refreshToken },
        });

        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (refreshError.response && refreshError.response.status === 401) {
          store.dispatch(logout());
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
