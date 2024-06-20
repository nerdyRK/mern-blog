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
        "Technology",
        "Health & Wellness",
        "Lifestyle",
        "Business & Finance",
        "Food & Drink",
        "Education",
        "Entertainment",
        "Arts & Culture",
        "Parenting & Family",
        "Sports",
        "Science & Nature",
        "Politics & Society",
        "Gaming",
        "Travel",
      ],
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
