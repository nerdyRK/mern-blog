import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/authReducer";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, password, photo };
    dispatch(updateProfile(updatedUser));
    setEditMode(false);
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
      <form onSubmit={handleSubmit}>
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
          <label className="block mb-2 text-sm font-bold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default Profile;
