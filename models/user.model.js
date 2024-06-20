import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profileImage: { type: String },
    bookmarkedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }], // Blogs created by the user
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
