import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants/api";

export const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

tmdbApi.interceptors.response.use(
  (response) => {
    return response;
  },
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
