import React, { useState } from "react";
import BlogSection from "./BlogSection";
import data from "../services/blogData";

const AllTrendingBlogs = () => {
  //* this data will be fetched from DB
  const [blogs, setBlogs] = useState(data);

  return (
    <BlogSection
      showAll={false}
      linkTo="/trending"
      title="Trending blogs"
      blogs={blogs}
    />
  );
};

export default AllTrendingBlogs;
