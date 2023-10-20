import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL, BASE_MONGO_URL } from "../config";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};
export const getGenres = createAsyncThunk("flixxit/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  //console.log(data);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  //console.log(array);
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};
const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk(
  "flixxit/genre",
  async ({ genre, type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres
    );
  }
);

export const fetchMovies = createAsyncThunk(
  "flixxit/trending",
  async ({ type }, thunkAPI) => {
    const {
      flixxit: { genres },
    } = thunkAPI.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
  }
);

export const getUsersLikedMovies = createAsyncThunk(
  "flixxit/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`${BASE_MONGO_URL}/api/user/liked/${email}`);
    return movies;
  }
);
// export const removeMovieFromLiked = createAsyncThunk(
//   "flixxit/deleteLiked",
//   async ({ movieId, email }) => {
//     const {
//       data: { movies },
//     } = await axios.put(`${BASE_MONGO_URL}/api/user/remove`, {
//       email,
//       movieId,
//     });
//     return movies;
//   }
// );
export const removeMovieFromLiked = createAsyncThunk(
  "flixxit/deleteLiked",
  async ({ movieId, email }, thunkAPI) => {
    try {
      const response = await axios.put(`${BASE_MONGO_URL}/api/user/remove`, {
        email,
        movieId,
      });
      const { movies } = response.data; // Assuming that the response contains a 'movies' property

      if (movies) {
        return movies;
      } else {
        return thunkAPI.rejectWithValue({
          message: "Invalid response format.",
        });
      }
    } catch (error) {
      // Handle the error and return a rejection with an error message
      return thunkAPI.rejectWithValue({
        message: "Failed to remove movie from liked list.",
      });
    }
  }
);

const FlixxitSlice = createSlice({
  name: "Flixxit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
      //console.log(state.genres);
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});
export const store = configureStore({
  reducer: {
    flixxit: FlixxitSlice.reducer,
  },
});
