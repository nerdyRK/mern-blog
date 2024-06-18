import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCard from "./BlogCard";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  const category = queryParams.get("category");

  useEffect(() => {
    if (!query && !category) {
      navigate(-1);
    } else {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`/api/search`, {
            params: { q: query, category: category },
          });
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results", error);
        }
      };
      fetchSearchResults();
    }
  }, [query, category, navigate, location]);

  return (
    <div className="max-w-[1300px] mt-6 mx-auto">
      <h1 className="text-3xl mb-5">
        Search Results for "{query}" in "{category}"
      </h1>
      <div className="flex gap-4 flex-wrap justify-center mx-auto max-w-full">
        {results.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
