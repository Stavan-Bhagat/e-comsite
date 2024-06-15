import axiosInstance from '../axios';

export const fetchProductData = async (page) => {
  const response = await axiosInstance.get(
    `/fusion/product/fetch-product-data?page=${page}&limit=8`
  );
  return response.data;
};

export const fetchProduct = async (id) => {
  const response = await axiosInstance.get(`/fusion/product/fetch-product/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await axiosInstance.get(
    `/fusion/product/fetch-product-by-category?category=${category}`
  );
  return response.data;
};

export const fetchCategoryProducts = async () => {
  const response = await axiosInstance.get(`/fusion/product/fetch-category-product`);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axiosInstance.delete(`/fusion/product/delete-product?id=${productId}`);
  return response.data;
};

export const updateProduct = async (data) => {
  const response = await axiosInstance.patch(`/fusion/product/update-product`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const addProduct = async (data) => {
  const response = await axiosInstance.post('/fusion/product/add-product', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const searchSuggestionProduct = async (query) => {
  const response = await axiosInstance.get(`/fusion/product/suggestions`, {
    params: { search: query },
  });

  return response.data;
};

export const searchProduct = async (query) => {
  const response = await axiosInstance.get('/fusion/product/search', {
    params: { query },
  });
  return response.data;
};
