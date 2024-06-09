import React, { useState } from "react";
import BlogSection from "./BlogSection";

const Trendingblogs = ({ data }) => {
  //* this data will be fetched from DB
  const [blogs, setBlogs] = useState(data);

  return (
    <BlogSection linkTo="/trending" title="Trending blogs" blogs={blogs} />
  );
};

export default Trendingblogs;
