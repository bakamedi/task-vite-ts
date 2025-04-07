import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // Importante para desarrollo
  headers: {
    'Content-Type': 'application/json',
  },
});
