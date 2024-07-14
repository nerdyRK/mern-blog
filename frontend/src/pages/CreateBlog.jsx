import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../store/blogReducer";
import { ToastContainer } from "react-toastify";
import axiosInstance from "../services/axiosInstance";
import { showToastError, showToastSuccess } from "../utils/toastUtil";
import categories from "../utils/constants";
import FormInput from "../components/FormInput";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      setImage(null); // Reset the image state
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // This resets the file input element
      }
      showToastSuccess("Blog created successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      showToastError("Failed to create blog.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            Image (optional)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <ToastContainer />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
