import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchMovies, discoverMoviesByGenre, getMovieDetails } from "../api";
import { Movie } from "../model";
import { MovieDetails } from "../movieDetails";

interface MovieState {
  movies: Movie[];
  query: string;
  page: number;
  hasMore: boolean;
  loading: boolean;
  selectedMovie: MovieDetails | null;
  genreFilter: number | null;
}

const initialState: MovieState = {
  movies: [],
  query: "Тест",
  page: 1,
  hasMore: true,
  loading: false,
  selectedMovie: null,
  genreFilter: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({
    query,
    page,
    genre,
  }: {
    query: string;
    page: number;
    genre: number | null;
  }) => {
    if (genre) {
      return await discoverMoviesByGenre(genre, page);
    }
    return await searchMovies(query, page, genre);
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (movieId: number) => {
    return await getMovieDetails(movieId);
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      state.movies = [];
      state.hasMore = true;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
      state.page = 1;
      state.movies = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.length < 5) {
          state.hasMore = false;
        }

        state.movies = [...state.movies, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.selectedMovie = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export const { setQuery, nextPage, setHasMore, setGenreFilter } =
  movieSlice.actions;
export default movieSlice.reducer;
