import React, { useState } from "react";
import BlogSection from "./BlogSection";

const RecentBlogs = ({ data }) => {
  //* this data will be fetched from DB
  const [blogs, setBlogs] = useState(data);

  return <BlogSection title="Recently Uploaded" blogs={blogs} />;
};

export default RecentBlogs;
