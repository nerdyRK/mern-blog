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
import { upload } from "../middlewares/multer.middleware.js";
import checkRights from "../middlewares/checkRights.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, upload.single("blogImage"), createBlog);
router.get("/", getAllBlogs);
router.get("/category/:category", getBlogsByCategory);
router.get("/user/:userId", getBlogsByUser);

router.patch(
  "/:id",
  verifyJWT,
  checkRights("blog"),
  upload.single("blogImage"),
  updateBlog
);

router.delete("/:id", verifyJWT, checkRights("blog"), deleteBlog);

export default router;
