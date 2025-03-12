import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { fetchMovies, nextPage } from "@/entities/movie/model/movieSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    if (query) {
      dispatch(fetchMovies({ query, page }));
    }
  }, [dispatch, query, page]);

  return (
    <div className={styles.movieList}>
      <SearchMovies />
      {loading && <Spinner />}
      {!loading && movies.length === 0 && <p>Ничего не найдено</p>}

      <InfiniteScroll
        dataLength={movies.length}
        next={() => dispatch(nextPage())}
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
