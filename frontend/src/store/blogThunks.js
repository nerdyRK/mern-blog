import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setBlogs,
  setTrendingBlogs,
  setRecentBlogs,
  setRecommendedBlogs,
} from "./blogReducer";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (page, { dispatch }) => {
    const response = await axios.get(`http://localhost:5000/blog?page=${page}`);
    dispatch(setBlogs(response.data));
  }
);

export const fetchTrendingBlogs = createAsyncThunk(
  "blogs/fetchTrendingBlogs",
  async (_, { dispatch }) => {
    const response = await axios.get("http://localhost:5000/blog/trending");
    dispatch(setTrendingBlogs(response.data));
  }
);

export const fetchRecentBlogs = createAsyncThunk(
  "blogs/fetchRecentBlogs",
  async (_, { dispatch }) => {
    const response = await axios.get("http://localhost:5000/blog/recent");
    dispatch(setRecentBlogs(response.data));
  }
);

export const fetchRecommendedBlogs = createAsyncThunk(
  "blogs/fetchRecommendedBlogs",
  async (_, { dispatch }) => {
    const response = await axios.get("http://localhost:5000/blog/recent");
    dispatch(setRecommendedBlogs(response.data));
  }
);
