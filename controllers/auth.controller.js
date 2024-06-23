// In your auth controllers (controllers/authController.js)
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import uploadToCloudinary from "../utils/cloudinary.js";

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Signup Controller
export const signup = async (req, res) => {
  const { name, email, password, photo } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let profileImage = "";
    // console.log(req.file);
    if (req.file) {
      const localFilePath = req.file.path;
      profileImage = await uploadToCloudinary(localFilePath);
      console.log(profileImage);
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      profileImage,
    });
    // Save user to database
    await user.save();
    // Generate JWT token
    const token = generateToken(user);
    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // use secure cookies in production
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Respond with user data (excluding password) and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Respond with user data (excluding password) and token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      role: user.role,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logout = (_, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};
