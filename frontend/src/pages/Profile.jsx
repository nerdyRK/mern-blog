import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authReducer";
import axiosInstance from "../services/axiosInstance";
import defaultUserImage from "../assets/defaultUserImage.png";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState(""); // For updating password
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setProfileImage(user.profileImage);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profileImage) formData.append("profileImage", profileImage);

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
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true); // Start loading

      await axios.put("http://localhost:5000/user/change-password", {
        password,
      });

      setPassword("");
      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle error
    } finally {
      setIsLoading(false); // Stop loading
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
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-black rounded"
            required
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-black rounded"
            required
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full p-2 border border-black rounded"
            disabled={!editMode}
          />
          <img
            src={profileImage || defaultUserImage}
            className="w-20 h-20 bg-slate-500 bg-opacity-40 mt-4"
            alt=""
          />
        </div>
        {editMode && (
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </button>
        )}
      </form>
      {editMode && (
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4 mt-6">
            <label className="block mb-2 text-sm font-bold">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-black rounded"
              minLength="8"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-red-500 text-white rounded"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
