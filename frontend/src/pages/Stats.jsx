import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, editBlog } from "../store/blogReducer";
import { useNavigate } from "react-router-dom";

const Stats = () => {
  const blogs = useSelector((state) => state.blogs.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const handleEdit = (id) => {
    // Navigate to the edit page or show the edit form
    navigate(`/edit-blog/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Your Blogs</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Title</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Dislikes</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.likes}</td>
              <td>{blog.comments}</td>
              <td>{blog.dislikes}</td>
              <td>{blog.date}</td>
              <td>
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="mr-2 p-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
