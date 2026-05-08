import axiosInstance from './axiosInstance';

export const fetchExperts = async ({ page = 1, limit = 10, category = '', search = '' }) => {
  const params = new URLSearchParams({ page, limit });
  if (category) params.append('category', category);
  if (search) params.append('search', search);

  const response = await axiosInstance.get(`/experts?${params.toString()}`);
  return response.data;
};

export const fetchExpertById = async (id) => {
  const response = await axiosInstance.get(`/experts/${id}`);
  return response.data.data;
};
