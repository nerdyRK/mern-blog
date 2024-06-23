import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogsByCategory,
  getBlogsByUser,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/", verifyJWT, upload.single("blogImage"), createBlog);
router.get("/", getAllBlogs);
router.get("/category/:category", getBlogsByCategory);
router.get("/user/:userId", getBlogsByUser);
router.put("/:id", verifyJWT, upload.single("blogImage"), updateBlog);
router.delete("/:id", verifyJWT, deleteBlog);

export default router;
