import styles from "./HomePage.module.scss";
import { MovieList } from "@/widgets/movieList/MovieList";

export const HomePage = () => {
  return (
    <main className={styles.homePage}>
      <MovieList />
    </main>
  );
};
