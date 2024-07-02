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
  const { name, email, password } = req.body;
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
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Generate JWT token
    const token = generateToken(user);
    res.cookie("test", "test", {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      // sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Respond with user data (excluding password) and token
    res.status(200).json({
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

export const logout = (_, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;
    let profileImage = "";
    if (req.file) {
      const localFilePath = req.file.path;
      profileImage = await uploadToCloudinary(localFilePath);
      // console.log(profileImage);
    }

    const updatedData = { name, email };
    if (profileImage) updatedData.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

export const verifyToken = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  console.log("user", user);
  res.status(200).json({ message: "Token verified successfully", user: user });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ message: "Password changed successfully" });
};
