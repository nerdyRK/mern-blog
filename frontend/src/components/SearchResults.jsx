import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { setSearchResults, filterByCategory } from "../store/blogReducer";

const SearchResults = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const filteredResults = useSelector((state) => state.blogs.filteredResults);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const params = new URLSearchParams(location.search);
      const query = params.get("q");
      const category = params.get("category");

      try {
        const response = await axios.get("http://localhost:5000/blog/search", {
          params: { q: query },
        });
        dispatch(setSearchResults(response.data)); // Store search results in Redux
        dispatch(filterByCategory(category || "All")); // Filter by category
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[1300px] my-6  mx-auto">
      <h1 className="text-3xl mb-5">Search Results</h1>
      <div className="flex gap-4 flex-wrap justify-center mx-auto max-w-full">
        {filteredResults.length > 0 ? (
          filteredResults.map((blog) => <BlogCard blog={blog} key={blog._id} />)
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
