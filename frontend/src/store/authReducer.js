// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: {
    name: '',
    email: '',
    password: '',
    photo: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      // Initialize with dummy data for now
      state.user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '',
        photo: null,
      };
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    deleteAccount: (state) => {
      state.isLoggedIn = false;
      state.user = null; },
  },
});

export const { login, logout, updateProfile ,deleteAccount} = authSlice.actions;
export default authSlice.reducer;
