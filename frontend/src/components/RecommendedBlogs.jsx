import React, { useState } from "react";
import BlogSection from "./BlogSection";

const RecommendedBlogs = ({ data }) => {
  //* this data will be fetched from DB
  const [blogs, setBlogs] = useState(data);

  return <BlogSection title="Recommended for you" blogs={blogs} />;
};

export default RecommendedBlogs;
