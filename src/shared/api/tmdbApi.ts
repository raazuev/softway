import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants/api";

export const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Ошибка API:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
