// routes/auth.js
import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);

export default router;
