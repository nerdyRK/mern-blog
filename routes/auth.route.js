// routes/auth.js
import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

router.post("/signup", upload.single("profileImage"), signup);
router.post("/login", login);

export default router;
