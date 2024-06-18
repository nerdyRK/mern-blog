import React, { useState } from "react";
import BlogSection from "./BlogSection";
import data from "../services/blogData";

const AllRecommendedBlogs = () => {
  //* this data will be fetched from DB
  const [blogs, setBlogs] = useState(data);

  return (
    <BlogSection
      linkTo="/recommended"
      title="Recommended for you"
      blogs={blogs}
      showAll={false}
    />
  );
};

export default AllRecommendedBlogs;
