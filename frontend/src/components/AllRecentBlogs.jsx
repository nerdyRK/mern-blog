import React, { useState } from "react";
import BlogSection from "./BlogSection";
import data from "../services/blogData";

const AllRecentBlogs = () => {
  //* this data will be fetched from DB
  const [blogs, setBlogs] = useState(data);

  return (
    <BlogSection linkTo="/recent" showAll={false} title="Recently Uploaded" blogs={blogs} />
  );
};

export default AllRecentBlogs;
