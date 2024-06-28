// routes/auth.js
import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);
//should i use check right middleware
router.post("/logout", verifyJWT, logout);

router.put("/profile", verifyJWT, upload.single("profileImage"), updateProfile);

export default router;
