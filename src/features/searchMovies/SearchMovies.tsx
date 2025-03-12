import { useState } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { setQuery, fetchMovies } from "@/entities/movie/model/movieSlice";

import styles from "./SearchMovies.module.scss";
import { Button } from "@/shared/ui/button/Button";

export const SearchMovies = () => {
  const [query, setLocalQuery] = useState("");

  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.movies.loading);

  const handleSearch = () => {
    if (!query.trim()) return;
    dispatch(setQuery(query));
    dispatch(fetchMovies(query));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        className={styles.input}
        type="text"
        placeholder="Введите название фильма"
        value={query}
        onChange={(e) => setLocalQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <Button onClick={handleSearch} disabled={loading || !query.trim()}>
        {loading ? "Поиск..." : "Найти"}
      </Button>
    </div>
  );
};
