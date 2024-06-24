import express from "express";
import {
  addComment,
  getCommentsByBlog,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import checkRights from "../middlewares/checkRights.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, addComment);

router.get("/blog/:blogId", getCommentsByBlog);

// Update a comment
router.put("/:id", verifyJWT, checkRights("comment"), updateComment);

// Delete a commentikha
router.delete("/:id", verifyJWT, checkRights("comment"), deleteComment);

export default router;
