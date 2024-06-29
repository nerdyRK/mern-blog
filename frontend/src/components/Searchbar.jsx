import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import categories from "../utils/constants";
import { filterByCategory } from "../store/blogReducer"; // Import the filter action

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    let searchURL = "/search";
    if (searchQuery) {
      searchURL += `?q=${searchQuery}`;
    }
    if (category && category !== "All") {
      searchURL += `${searchQuery ? "&" : "?"}category=${category}`;
    }
    if (searchQuery || category !== "All") {
      navigate(searchURL);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(filterByCategory(e.target.value)); // Filter by category on client side
  };

  return (
    <div className="flex justify-end py-4 gap-8 px-10 shadow-lg items-center">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-l"
          placeholder="Search by blogger or title"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
          Search
        </button>
      </form>
      <select
        value={category}
        onChange={handleCategoryChange}
        className="p-2 border"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
