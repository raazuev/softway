import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { setGenreFilter } from "@/entities/movie/model/movieSlice";
import { getGenres } from "@/entities/movie/api";

import styles from "./GenreFilter.module.scss";

export const GenreFilter = () => {
  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector((state) => state.movies.genreFilter);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genresList = await getGenres();
      setGenres(genresList);
    };
    loadGenres();
  }, []);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = Number(event.target.value);
    dispatch(setGenreFilter(genreId));
  };

  return (
    <div className={styles.genre}>
      <select
        className={styles.genre__select}
        onChange={handleGenreChange}
        value={selectedGenre || ""}
      >
        <option value="">Все жанры</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};
