import { tmdbApi } from "@/shared/api/tmdbApi";
import { Movie } from "./model";
import { MovieDetails } from "./movieDetails";

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: {
        query: query,
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
