import { tmdbApi } from "@/shared/api/tmdbApi";
import { Movie } from "./model";

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {
  try {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, page },
    });

    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.posterPath_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      rating: movie.vote_average,
    }));
  } catch (err) {
    console.error("Ошибка при загрузке фильмов", err);
    return [];
  }
};
