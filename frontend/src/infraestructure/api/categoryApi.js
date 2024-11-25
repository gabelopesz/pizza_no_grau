import axios from "axios";

const API_URL = "http://localhost:3000/categories";

export const fetchCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

export const updateCategory = async (id, updatedCategory) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedCategory);
  return response.data;
};

export const removeCategory = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
