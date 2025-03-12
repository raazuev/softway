import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import {
  fetchMovies,
  nextPage,
  resetQuery,
} from "@/entities/movie/model/movieSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import { GenreFilter } from "@/features/genreFilter/GenreFilter";
import { SearchMovies } from "@/features/searchMovies/SearchMovies";
import { Spinner } from "@/shared/ui/spinner/Spinner";
import styles from "./MovieList.module.scss";

export const MovieList = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);
  const loading = useAppSelector((state) => state.movies.loading);
  const query = useAppSelector((state) => state.movies.query);
  const page = useAppSelector((state) => state.movies.page);
  const hasMore = useAppSelector((state) => state.movies.hasMore);
  const genre = useAppSelector((state) => state.movies.genreFilter);

  const handleResetSearch = () => {
    dispatch(resetQuery());
  };

  const handleNextPage = () => {
    if (hasMore && !loading) {
      dispatch(nextPage());
    }
  };

  useEffect(() => {
    dispatch(fetchMovies({ query, page, genre }));
  }, [dispatch, query, page, genre]);

  return (
    <div className={styles.movieList}>
      <SearchMovies onResetSearch={handleResetSearch} />
      <GenreFilter />
      {loading && <Spinner />}
      {!loading && movies.length === 0 && <p>Ничего не найдено</p>}

      <InfiniteScroll
        dataLength={movies.length}
        next={handleNextPage}
        hasMore={hasMore}
        loader={<Spinner />}
      >
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img src={movie.posterPath} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <span>{movie.rating}</span>
              </Link>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
