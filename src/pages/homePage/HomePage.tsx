import { useEffect, useState } from "react";
import { searchMovies } from "@/entities/movie/api";
import { Movie } from "@/entities/movie/model";

import { Spinner } from "@/shared/ui/spinner/Spinner";
import { Button } from "@/shared/ui/button/Button";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    searchMovies("Тест").then(setMovies);
  }, []);

  return (
    <div className={styles.homePage}>
      <h1>Home</h1>
      <div>
        <input
          type="text"
          placeholder="Введите название фильма"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Поиск..." : "Найти"}
        </Button>
      </div>

      {loading && <Spinner />}

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.posterPath} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
            <span>{movie.rating}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
