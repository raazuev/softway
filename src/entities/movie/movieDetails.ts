export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  rating: number;
  genres: string[];
  releaseDate: string;
}
