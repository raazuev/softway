import styles from "./HomePage.module.scss";
import { MovieList } from "@/widgets/movieList/MovieList";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <MovieList />
    </div>
  );
};
