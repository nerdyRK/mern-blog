import React, { useEffect, useState } from "react";
import BlogSection from "./BlogSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingBlogs } from "../store/blogThunks";

const AllTrendingBlogs = () => {
  const dispatch = useDispatch();
  const trendingBlogs = useSelector((state) => state.blogs.trendingBlogs);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!trendingBlogs.length) {
        await dispatch(fetchTrendingBlogs());
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, trendingBlogs]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BlogSection
      showAll={false}
      linkTo="/trending"
      title="Trending blogs"
      blogs={trendingBlogs}
    />
  );
};

export default AllTrendingBlogs;
