import axiosInstance from "axios";

export const fetchUserData = async () => {
  const response = await axiosInstance.get("/fusion/submit/fetch-user");
  return response.data;
};

export const updateUserData = async (id, data) => {
  const response = await axiosInstance.patch(`/submit/update-user?id=${id}`, data);
  return response.data;
};

export const deleteUserData = async (id) => {
  const response = await axiosInstance.delete(`/fusion/submit/delete-user?id=${id}`);
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
