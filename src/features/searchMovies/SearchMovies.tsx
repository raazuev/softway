import { useState, useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import {
  setQuery,
  resetQuery,
  fetchMovies,
} from "@/entities/movie/model/movieSlice";

import styles from "./SearchMovies.module.scss";
import { Button } from "@/shared/ui/button/Button";

interface SearchMoviesProps {
  onResetSearch: () => void;
}

export const SearchMovies = ({ onResetSearch }: SearchMoviesProps) => {
  const [localQuery, setLocalQuery] = useState("");

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.movies.loading);
  const globalQuery = useAppSelector((state) => state.movies.query);

  const handleSearch = () => {
    if (!localQuery.trim()) return;

    dispatch(setQuery(localQuery));
    dispatch(fetchMovies({ query: localQuery, page: 1, genre: null }));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleReset = () => {
    setLocalQuery("");
    dispatch(resetQuery());
    onResetSearch();
  };

  useEffect(() => {
    if (globalQuery !== localQuery) {
      setLocalQuery(globalQuery);
    }
  }, [globalQuery]);

  return (
    <div className={styles.search}>
      <input
        className={styles.search__input}
        type="text"
        placeholder="Введите название фильма"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <section className={styles.search__btn}>
        <Button onClick={handleSearch} disabled={loading || !localQuery.trim()}>
          {loading ? "Поиск..." : "Найти"}
        </Button>
        <Button color="reset" onClick={handleReset}>
          Сбросить
        </Button>
      </section>
    </div>
  );
};
