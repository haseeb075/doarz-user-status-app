import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});

export default store
