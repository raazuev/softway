import { tmdbApi } from "@/shared/api/tmdbApi";
import { Movie } from "./model";
import { MovieDetails } from "./movieDetails";

export const discoverMoviesByGenre = async (
  page: number = 1,
  genreId: number | null = null
): Promise<Movie[]> => {
  try {
    const params: any = {
      page: page,
      sort_by: "popularity.desc",
    };

    if (genreId) {
      params.with_genres = genreId;
    }

    const response = await tmdbApi.get("/discover/movie", { params });

    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      rating: movie.vote_average,
    }));
  } catch (err) {
    console.error("Ошибка при загрузке фильмов", err);
    return [];
  }
};

export const getGenres = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const response = await tmdbApi.get("/genre/movie/list");

    return response.data.genres;
  } catch (err) {
    console.error("Ошибка при загрузке жанров", err);
    return [];
  }
};

export const searchMovies = async (
  query: string,
  page: number = 1,
  genreId: number | null = null
): Promise<Movie[]> => {
  try {
    const params: any = {
      query: query,
      page: page,
    };

    if (genreId) {
      params.with_genres = genreId;
    }

    console.log("Запрос к API:", params);

    const response = await tmdbApi.get("/search/movie", { params });

    console.log("Ответ от API:", response.data);

    if (!response.data.results || response.data.results.length === 0) {
      console.log("Фильмы не найдены");
      return [];
    }

    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      rating: movie.vote_average,
    }));
  } catch (err) {
    console.error("Ошибка при загрузке фильмов", err);
    return [];
  }
};

export const getMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);

    return {
      id: response.data.id,
      title: response.data.title,
      overview: response.data.overview,
      posterPath: response.data.poster_path
        ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
        : null,
      rating: response.data.vote_average,
      genres: response.data.genres.map((genre: any) => genre.name),
      releaseDate: response.data.release_date,
    };
  } catch (err) {
    console.error("Ошибка при загрузке данных о фильме", err);
    throw new Error("Не удалось загрузить информацию о фильме");
  }
};
