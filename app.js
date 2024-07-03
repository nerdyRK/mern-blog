import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import authRoute from "./routes/auth.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
app.use("/auth", authRoute);

app.use("/blog", blogRoute);

app.use("/comment", commentRoute);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.use(express.static(path.join(__dirname, "./frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./frontend/dist", "index.html"));
// });

// Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
// Database Connection
connectDB().then(() =>
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
);
