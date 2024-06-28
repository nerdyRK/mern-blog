import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import defaultBlogImage from "../assets/defaultBlogImage.avif";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        setError("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {blog ? (
        <div className="max-w-[1000px] mx-auto border-2 border-black">
          <h1 className="text-3xl text-center p-4">{blog.title}</h1>
          <img
            src={blog.blogImage || defaultBlogImage}
            className="min-w-[80%] max-h-[400px] mx-auto object-cover"
            alt=""
          />
          <p className="max-w-[80%] mx-auto p-4">{blog.content}</p>
          {/* Display other blog details */}
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default Blog;
