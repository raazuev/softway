import { tmdbApi } from "@/shared/api/tmdbApi";
import { Movie } from "./model";
import { MovieDetails } from "./movieDetails";

export const discoverMoviesByGenre = async (
  genreId: number,
  page: number = 1
): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page: page,
      },
    });

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
    console.error("Ошибка при загрузке фильмов по жанру", err);
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

    const response = await tmdbApi.get("/search/movie", { params });

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
