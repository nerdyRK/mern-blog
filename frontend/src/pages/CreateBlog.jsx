import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBlog } from "../store/blogReducer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultUserImage from "../assets/defaultUserImage.png";
import axiosInstance from "../services/axiosInstance";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (image) {
      formData.append("blogImage", image);
    }

    try {
      const response = await axiosInstance.post("/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newBlog = response.data;
      dispatch(addBlog(newBlog));
      setTitle("");
      setContent("");
      setCategory("");
      setImage(null);
      toast.success("Blog created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again later.", {
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

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-black rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-black rounded"
            rows="10"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={handleImageChange}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <ToastContainer />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
