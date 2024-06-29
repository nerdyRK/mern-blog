import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  trendingBlogs: [],
  recentBlogs: [],
  recommendedBlogs: [],
  page: 1,
  totalPages: 1,
  totalBlogs: 0,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      const { blogs, page, totalPages, totalBlogs } = action.payload;
      state.blogs = blogs;
      state.page = page;
      state.totalPages = totalPages;
      state.totalBlogs = totalBlogs;
    },
    setSearchResults: (state, action) => {
      // Add this
      state.searchResults = action.payload;
      state.filteredResults = action.payload;
    },
    filterByCategory: (state, action) => {
      // Add this
      // console.log(action.payload);
      if (action.payload === "All") {
        state.filteredResults = state.searchResults;
      } else {
        state.filteredResults = state.searchResults.filter(
          (blog) => blog.category === action.payload.toLowerCase()
        );
      }
    },
    setTrendingBlogs: (state, action) => {
      state.trendingBlogs = action.payload;
    },
    setRecentBlogs: (state, action) => {
      state.recentBlogs = action.payload;
    },
    setRecommendedBlogs: (state, action) => {
      state.recommendedBlogs = action.payload;
    },
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    editBlog: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index] = { ...state.blogs[index], ...action.payload };
      }
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  setBlogs,
  setSearchResults,
  filterByCategory,
  setTrendingBlogs,
  setRecentBlogs,
  setRecommendedBlogs,
  deleteBlog,
  editBlog,
  addBlog,
  setPage,
} = blogSlice.actions;
export default blogSlice.reducer;
