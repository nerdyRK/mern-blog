import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authReducer";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState(""); // For updating password

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, photo };

    // Update user profile on the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (photo) formData.append("photo", photo);

    try {
      const response = await axios.put(
        "http://localhost:5000/user/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Dispatch the updateProfile action with the updated user data
      dispatch(updateProfile(response.data));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:5000/user/change-password", {
        password,
      });
      setPassword("");
      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle the error, e.g., show an error message to the user
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
            src={photo}
            className="w-20 h-20 bg-slate-500 bg-opacity-40 mt-4"
            alt=""
          />
        </div>
        {editMode && (
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Save Changes
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
          >
            Change Password
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
