import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../store/blogReducer";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlog({ title, content }));
    setTitle("");
    setContent("");
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
