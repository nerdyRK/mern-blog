// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import blogReducer from './blogReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogReducer,
    // Add other reducers if any
  },
});

export default store;
