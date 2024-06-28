import { useEffect, useState } from "react";
import BlogSection from "./BlogSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentBlogs } from "../store/blogThunks";
const AllRecentBlogs = () => {
  const dispatch = useDispatch();

  const recentBlogs = useSelector((state) => state.blogs.recentBlogs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!recentBlogs.length) {
        await dispatch(fetchRecentBlogs());
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch, recentBlogs]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <BlogSection
      linkTo="/recent"
      showAll={false}
      title="Recently Uploaded"
      blogs={recentBlogs}
    />
  );
};

export default AllRecentBlogs;
