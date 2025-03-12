import axios from "axios";
import { API_BASE_URL, TMDB_ACCESS_TOKEN } from "../constants/api";

export const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
  },
});

tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `Ошибка API (статус: ${error.response.status}):`,
        error.response.data
      );
    } else if (error.request) {
      console.error("Ошибка сети или нет ответа:", error.request);
    } else {
      console.error("Ошибка при настройке запроса:", error.message);
    }
    return Promise.reject(error);
  }
);
