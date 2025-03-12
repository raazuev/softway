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
  query: "",
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
    if (!query.trim() && !genre) {
      return await discoverMoviesByGenre(page);
    }

    if (genre) {
      return await discoverMoviesByGenre(page, genre);
    }

    return await searchMovies(query, page);
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
      state.loading = false;
    },
    resetQuery: (state) => {
      state.query = "";
      state.page = 1;
      state.movies = [];
      state.hasMore = true;
      state.loading = false;
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
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.payload.length === 0 || action.payload.length < 20) {
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

export const { setQuery, nextPage, setHasMore, setGenreFilter, resetQuery } =
  movieSlice.actions;
export default movieSlice.reducer;
