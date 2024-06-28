import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "technology",
        "health & wellness",
        "lifestyle",
        "business & finance",
        "food & drink",
        "education",
        "entertainment",
        "arts & culture",
        "parenting & family",
        "sports",
        "science & nature",
        "politics & society",
        "gaming",
        "travel",
      ],
      default: "technology",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    blogImage: { type: String }, // Optional blog image
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
