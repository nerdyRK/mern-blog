import { useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import {
  setSearchResults,
  setLoading,
  clearSearchResults,
} from "../store/blogReducer";
import axiosInstance from "../services/axiosInstance";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchResults, page, totalPages, loading } = useSelector(
    (state) => state.blogs
  );

  const searchParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    const category =
      params.get("category") && params.get("category") !== "All"
        ? params.get("category")
        : "";
    return { query, category };
  }, [location.search]);

  const fetchSearchResults = useCallback(
    async (page = 1) => {
      page = Number(page);
      console.log(`Fetching page ${page}`);
      const { query, category } = searchParams;

      try {
        dispatch(setLoading(true));
        if (page === 1) {
          dispatch(clearSearchResults());
        }
        const response = await axiosInstance.get(
          "http://localhost:5000/blog/search",
          {
            params: { q: query, category, page, limit: 10 },
          }
        );
        dispatch(
          setSearchResults({
            blogs: response.data.blogs,
            page: response.data.page,
            totalPages: response.data.totalPages,
          })
        );
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [searchParams, dispatch]
  );

  useEffect(() => {
    fetchSearchResults(1);
  }, [searchParams, fetchSearchResults]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        page < totalPages &&
        !loading
      ) {
        fetchSearchResults(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, loading, fetchSearchResults]);

  return (
    <div className="max-w-[1300px] my-6 mx-auto">
      <h1 className="text-3xl mb-5">Search Results</h1>
      <div className="flex gap-4 flex-wrap justify-center mx-auto max-w-full">
        {searchResults?.length > 0 ? (
          searchResults.map((blog) => <BlogCard blog={blog} key={blog._id} />)
        ) : (
          <p>No results found</p>
        )}
      </div>
      {loading && <p>Loading more blogs...</p>}
    </div>
  );
};

export default SearchResults;
