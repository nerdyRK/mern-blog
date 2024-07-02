import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stats = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBlogData, setEditBlogData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.user._id);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // Fetch blogs for the logged-in user
      const fetchBlogs = async () => {
        try {
          const response = await axiosInstance.get(`/blog/user/${userId}`);
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlogs();
    }
  }, [isLoggedIn, userId]);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/blog/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleEdit = (blog) => {
    setEditBlogData(blog);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditBlogData({ ...editBlogData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEditBlogData({ ...editBlogData, blogImage: e.target.files[0] });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editBlogData.title);
    formData.append("content", editBlogData.content);
    formData.append("category", editBlogData.category);
    if (editBlogData.blogImage) {
      formData.append("blogImage", editBlogData.blogImage);
    }

    try {
      const response = await axiosInstance.patch(
        `/blog/${editBlogData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBlogs(
        blogs.map((blog) =>
          blog._id === editBlogData._id ? response.data : blog
        )
      );
      setIsEditModalOpen(false);
      toast.success("Blog updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
      <table className="min-w-full border-black border">
        <thead>
          <tr className="border-black border">
            <th className="border-black border py-2">#</th>
            <th className="border-black border">Title</th>
            <th className="border-black border">Likes</th>
            <th className="border-black border">Comments</th>
            {/* <th className="border-black border">Dislikes</th> */}
            <th className="border-black border">Date</th>
            <th className="border-black border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className="text-center">
              <td className="border-black border">{index + 1}</td>
              <td className="border-black border">{blog.title}</td>
              <td className="border-black border">{blog.likes.length}</td>
              <td className="border-black border">{blog.comments.length}</td>
              {/* <td className="border-black border">{blog.dislikes}</td> */}
              <td className="border-black border">
                {new Date(blog.createdAt).toLocaleDateString()}
              </td>
              <td className="border-black border py-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="mr-2 p-2 py-1 px-4 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="p-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editBlogData.title}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-black rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Content</label>
                <textarea
                  name="content"
                  value={editBlogData.content}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-black rounded"
                  rows="10"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">Category</label>
                <select
                  name="category"
                  value={editBlogData.category}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-black rounded"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="technology">Technology</option>
                  <option value="health & wellness">Health & Wellness</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="business & finance">Business & Finance</option>
                  <option value="food & drink">Food & Drink</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="arts & culture">Arts & Culture</option>
                  <option value="parenting & family">Parenting & Family</option>
                  <option value="sports">Sports</option>
                  <option value="science & nature">Science & Nature</option>
                  <option value="politics & society">Politics & Society</option>
                  <option value="gaming">Gaming</option>
                  <option value="travel">Travel</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold">
                  Image (optional)
                </label>
                <input
                  type="file"
                  name="blogImage"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-black rounded"
                />
              </div>
              <ToastContainer />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
              >
                Update Blog
              </button>
            </form>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="mt-4 w-full p-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
