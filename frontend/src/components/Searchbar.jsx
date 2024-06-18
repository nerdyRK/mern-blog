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
    console.log(searchQuery, category);
    if (searchQuery) {
      searchURL += `?q=${searchQuery}`;
    }
    if (category) {
      searchURL += `${searchQuery ? "&" : "?"}category=${category}`;
    }
    if (searchQuery || category) {
      navigate(searchURL);
    }
  };

  return (
    <div className="flex justify-end py-4 gap-8 px-10 shadow-lg items-center">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-l"
          placeholder="Search by blogger or category"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r">
          Search
        </button>
      </form>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border"
      >
        <option value="" disabled>
          Filter by category
        </option>
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
