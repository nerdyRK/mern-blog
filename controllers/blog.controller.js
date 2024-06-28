import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";

// Create a new blog
export const createBlog = async (req, res) => {
  let { title, content, category } = req.body;
  category = category.toLowerCase();
  const author = req.user.id;
  let blogImage = "";
  if (req.file) {
    blogImage = await uploadToCloudinary(req.file.path);
  }

  const newBlog = new Blog({
    title,
    content,
    author,
    category,
    blogImage,
  });

  const savedBlog = await newBlog.save();
  // Update user blogs
  await User.findByIdAndUpdate(author, { $push: { blogs: savedBlog._id } });
  console.log(savedBlog);
  res.status(201).json(savedBlog);
};

// Get all blogs
export const getAllBlogs = async (_, res) => {
  const blogs = await Blog.find()
    .populate("author", "name")
    .populate("comments");
  // console.log("dcdcd", blogs);
  const blogsWithLikeCount = blogs.map((blog) => ({
    ...blog.toObject(),
    likeCount: blog.likes.length,
  }));
  //   console.log("dd", blogsWithLikeCount);
  res.status(200).json(blogsWithLikeCount);
};

// Get blogs by category
export const getBlogsByCategory = async (req, res) => {
  const category = req.params.category.toLowerCase();
  const blogs = await Blog.find({ category }).populate("author", "name");
  const blogsWithLikeCount = blogs.map((blog) => ({
    ...blog.toObject(),
    likeCount: blog.likes.length,
  }));
  res.status(200).json(blogsWithLikeCount);
};

// Get blogs by user
export const getBlogsByUser = async (req, res) => {
  const userId = req.params.userId;
  const blogs = await Blog.find({ author: userId }).populate("author", "name");
  const blogsWithLikeCount = blogs.map((blog) => ({
    ...blog.toObject(),
    likeCount: blog.likes.length,
  }));
  res.status(200).json(blogsWithLikeCount);
};

// Update a blog
export const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, content, category } = req.body;

  let blogImage = "";
  console.log("image", req.file);
  if (req.file) {
    blogImage = await uploadToCloudinary(req.file.path);
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { title, content, category, blogImage: blogImage },
    { new: true }
  );

  const blogWithLikeCount = {
    ...updatedBlog.toObject(),
    likeCount: updatedBlog.likes.length,
  };

  res.status(200).json(blogWithLikeCount);
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findByIdAndDelete(blogId);
  // Remove blog from user's blog list
  await User.findByIdAndUpdate(blog.author, { $pull: { blogs: blogId } });

  res.status(200).json({ message: "Blog deleted" });
};

export const getRecentBlogs = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const recentBlogs = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec();
  res.json(recentBlogs);
};

export const getTrendingBlogs = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const trendingBlogs = await Blog.find()
    .sort({ likes: -1 })
    .limit(limit)
    .exec();
  res.json(trendingBlogs);
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
