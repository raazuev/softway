import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { fetchMovieDetails } from "@/entities/movie/model/movieSlice";
import { ROUTES } from "@/shared/constants/routes";

import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Button } from "@/shared/ui/button/Button";
import styles from "./MovieDetails.module.scss";

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.selectedMovie);

  const mainNavigate = useNavigate();

  const handleMainPage = () => {
    mainNavigate(ROUTES.HOME);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)));
    }
  }, [id]);

  if (!movie) {
    return <Spinner />;
  }

  return (
    <div className={styles.details}>
      <section>
        <img src={movie.posterPath} alt={movie.title} />
      </section>
      <section className={styles.descr}>
        <h2>{movie.title}</h2>
        <h3>{movie.overview}</h3>
        <p>
          <span>Жанры:</span>
          {movie.genres.join(", ")}
        </p>
        <p>
          <span>Даты выхода:</span>
          {movie.releaseDate}
        </p>
        <Button onClick={handleMainPage}>Назад</Button>
      </section>
    </div>
  );
};
