// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const getAllPokemons = async () => {
  const response = await axios.get(`${API_BASE_URL}/pokemons`, getAuthHeaders());
  return response.data;
};

export const getPokemonById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${id}`, getAuthHeaders());
  return response.data;
};

export const createPokemon = async (data) => {
  const config = getAuthHeaders();
  const response = await axios.post(`${API_BASE_URL}/pokemons`, data, config);
  return response.data;
};

export const updatePokemon = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/pokemons/${id}`, data, getAuthHeaders());
  return response.data;
};

export const deletePokemon = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}`, getAuthHeaders());
  return response.data;
};

// 🔐 Auth
export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, { name, email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
  return response.data;
};

// 🗨️ Poketalk Posts
export const getAllPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`, getAuthHeaders());
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, postData, getAuthHeaders());
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`, getAuthHeaders());
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${postId}/like`, {}, getAuthHeaders());
  return response.data;
};

export const dislikePost = async (postId) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${postId}/dislike`, {}, getAuthHeaders());
  return response.data;
};