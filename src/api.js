import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'http://10.100.240.77:8080'; 

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  await SecureStore.setItemAsync('token', response.data.access_token); 
  return response.data;
};

export const register = async (name, email, password, username) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password, username });
  return response.data;
};

export const createProduct = async (data) => {
  const access_token = await getToken();
  const response = await axios.post(`${API_URL}/products`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

export const getProduct = async (page, size) => {
  const access_token = await getToken();
  const response = await axios.get(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      page,
      size,
    },
  });
  return response.data;
}; 
export const getProductById = async (id) => {
  const access_token = await getToken();
  const response = await axios.get(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
}; 
export const updateProductById = async (id, data) => {
  const access_token = await getToken();
  const response = await axios.put(`${API_URL}/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};

export const deleteProductById = async (id) => {
  const access_token = await getToken();
  const response = await axios.delete(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return response.data;
};


export const logout = async () => {
  await SecureStore.deleteItemAsync('token'); 
};