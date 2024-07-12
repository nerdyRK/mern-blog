import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
const useIdBlog = (id) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  return { blog, loading, error };
};
export default useIdBlog;
