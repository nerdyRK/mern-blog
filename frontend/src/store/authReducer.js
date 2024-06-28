// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {
    name: "",
    email: "",
    password: "",
    photo: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
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
      state.user = null;
    },
  },
});

export const { login, logout, updateProfile, deleteAccount } =
  authSlice.actions;
export default authSlice.reducer;
