import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../utils/constants";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    let searchURL = "/search";

    if (searchQuery) {
      searchURL += `?q=${encodeURIComponent(searchQuery)}`;
    }
    if (category && category !== "All") {
      searchURL += `${searchQuery ? "&" : "?"}category=${encodeURIComponent(
        category
      )}`;
    }

    // Only navigate if there's a search query or the category is not "All"

    navigate(searchURL);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-end py-4 gap-2 sm:gap-8 sm:px-10 shadow-lg items-center">
      <select
        value={category}
        onChange={handleCategoryChange}
        className="p-2 border"
      >
        <option value={""} disabled>
          Choose a category
        </option>
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <form onSubmit={handleSearch} className="flex">
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
    </div>
  );
};

export default SearchBar;
