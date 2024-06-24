import Comment from "../models/comment.model.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

// Add a comment to a blog
export const addComment = async (req, res) => {
  const { blogId, content } = req.body;
  console.log(req.body);
  const userId = req.user.id;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  const comment = new Comment({
    content,
    author: userId,
    blog: blogId,
  });

  const createdComment = await comment.save();

  blog.comments.push(createdComment._id);
  await blog.save();

  res.status(201).json(createdComment);
};

// Get comments for a specific blog
export const getCommentsByBlog = async (req, res) => {
  const blogId = req.params.blogId;

  const blog = await Blog.findById(blogId).populate({
    path: "comments",
    populate: { path: "author", select: "name" },
  });

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.status(200).json(blog.comments);
};

// Update a comment
export const updateComment = async (req, res) => {
  // console.log("Update comment called");

  const commentId = req.params.id;
  const { content } = req.body;
  // console.log("body", content);
  // console.log("param", commentId);

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  comment.content = content;
  const updatedComment = await comment.save();

  res.status(200).json(updatedComment);
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  // console.log("param", commentId);

  const comment = await Comment.findById(commentId);

  if (!comment) {
    res.status(404).json({ message: "Comment not found" });
    return;
  }

  const blog = await Blog.findById(comment.blog);
  if (blog) {
    blog.comments.pull(comment._id);
    await blog.save();
  }

  await Comment.findByIdAndDelete(commentId);

  res.status(200).json({ message: "Comment deleted" });
};
