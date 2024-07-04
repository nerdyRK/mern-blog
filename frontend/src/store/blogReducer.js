import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  trendingBlogs: [],
  recentBlogs: [],
  recommendedBlogs: [],
  page: 1,
  totalPages: 1,
  totalBlogs: 0,
  searchResults: [],
  loading: false,
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
      const { blogs, page, totalPages } = action.payload;
      const allBlogs = page === 1 ? blogs : [...state.searchResults, ...blogs];
      state.searchResults = Array.from(
        new Set(allBlogs.map((blog) => blog._id))
      ).map((id) => allBlogs.find((blog) => blog._id === id));
      state.page = page;
      state.totalPages = totalPages;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.page = 1;
      state.totalPages = 1;
      console.log("search results cleared");
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
    updateLikes: (state, action) => {
      const { blogId, likes } = action.payload;
      const blog = state.blogs.find((b) => b._id === blogId);
      if (blog) {
        blog.likes = likes;
      }
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
  setLoading,
  clearSearchResults,
  setPage,
  updateLikes,
} = blogSlice.actions;
export default blogSlice.reducer;
