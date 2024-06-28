import React, { useEffect, useState } from "react";
import RecentBlogs from "../components/RecentBlogs";
import Recommended from "../components/RecommendedBlogs";
import TrendingBlogs from "../components/TrendingBlogs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecentBlogs,
  fetchRecommendedBlogs,
  fetchTrendingBlogs,
} from "../store/blogThunks";

const Home = () => {
  const dispatch = useDispatch();
  const trendingBlogs = useSelector((state) => state.blogs.trendingBlogs);
  const recentBlogs = useSelector((state) => state.blogs.recentBlogs);
  const recommendedBlogs = useSelector((state) => state.blogs.recentBlogs);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTrendingBlogs());
      await dispatch(fetchRecentBlogs());
      await dispatch(fetchRecommendedBlogs());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="py-10">
      <Recommended data={recommendedBlogs.slice(0, 3)} />
      <TrendingBlogs data={trendingBlogs.slice(0, 3)} />
      <RecentBlogs data={recentBlogs.slice(0, 3)} />
    </div>
  );
};

export default Home;
