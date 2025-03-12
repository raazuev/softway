import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { fetchMovieDetails } from "@/entities/movie/model/movieSlice";
import { ROUTES } from "@/shared/constants/routes";

import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Button } from "@/shared/ui/button/Button";

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
    <div>
      <img src={movie.posterPath} alt={movie.title} />
      <section>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Жанры:</strong>
          {movie.genres.join(", ")}
        </p>
        <p>
          <strong>Даты выхода:</strong>
          {movie.releaseDate}
        </p>
      </section>
      <Button onClick={handleMainPage}>Назад</Button>
    </div>
  );
};
