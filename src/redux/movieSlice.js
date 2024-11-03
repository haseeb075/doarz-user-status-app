import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `https://api.tvmaze.com/shows`;


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default movieSlice.reducer;
