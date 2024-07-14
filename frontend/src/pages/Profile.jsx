import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authReducer";
import axiosInstance from "../services/axiosInstance";
import defaultUserImage from "../assets/defaultUserImage.png";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../components/FormInput";
import { showToastError, showToastSuccess } from "../utils/toastUtil";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState(""); // For updating new password
  const [oldPassword, setOldPassword] = useState(""); // For old password check
  const [isProfileLoading, setIsProfileLoading] = useState(false); // Loading state
  const [isPasswordLoading, setIsPasswordLoading] = useState(false); // Loading state
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    // Get the selected file
    const file = e.target.files[0];
    // Convert file to URL that can be displayed
    const imageUrl = URL.createObjectURL(file);
    // Set profileImage state to the selected file and imageUrl for display
    setProfileImage({ file, imageUrl });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsProfileLoading(true); // Start loading

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profileImage) formData.append("profileImage", profileImage.file);

    try {
      const response = await axiosInstance.put(
        "http://localhost:5000/auth/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(updateProfile(response.data));
      setEditMode(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsProfileLoading(false); // Stop loading
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsPasswordLoading(true);
      await axiosInstance.put("/auth/change-password", {
        oldPassword,
        newPassword: password,
      });
      setPassword("");
      setOldPassword("");
      showToastSuccess("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      showToastError("Old Password is incorrect");
    } finally {
      setIsPasswordLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <button
        onClick={() => setEditMode(!editMode)}
        className="mb-4 py-2 px-4 bg-blue-500 text-white rounded"
      >
        {editMode ? "Cancel" : "Edit Profile"}
      </button>
      <form onSubmit={handleProfileUpdate}>
        <FormInput
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={!editMode}
        />
        <FormInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={!editMode}
        />
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full p-2 border border-black rounded"
            disabled={!editMode}
          />
          {/* Display profile image */}
          {profileImage && (
            <img
              src={profileImage.imageUrl || profileImage || defaultUserImage}
              className="w-20 h-20 bg-slate-500 bg-opacity-40 mt-4"
              alt="Profile"
            />
          )}
        </div>
        {editMode && (
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
            disabled={isProfileLoading} // Disable button during loading
          >
            {isProfileLoading ? "Updating..." : "Save Changes"}
          </button>
        )}
      </form>

      {/* Form for password changing */}
      {editMode && (
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4 mt-6 relative">
            <label className="block mb-2 text-sm font-bold">Old Password</label>
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-2 border border-black rounded"
              required
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {!showOldPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2 text-sm font-bold">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-black rounded"
              minLength="8"
              required
            />
            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-red-500 text-white rounded"
            disabled={isPasswordLoading} // Disable button during loading
          >
            {isPasswordLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
