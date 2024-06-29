import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authReducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      // 500KB size limit
      setPhotoError("File size shouldn't exceed 500KB");
      setPhoto(null);
    } else {
      setPhoto(file);
      setPhotoError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignUp) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (photo) {
          formData.append("profileImage", photo);
        }
        response = await axios.post(
          "http://localhost:5000/auth/signup",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });
      }

      {
        // console.log(response);
        // const userData = {
        //   name: response.data.name,
        //   email: response.data.email,
        //   photo: response.data.photo,
        // };
        // console.log(r);
        // Handle successful login/signup
      }
      dispatch(login(response.data)); // Dispatch login action to update Redux store

      navigate("/dashboard"); // Redirect to dashboard after successful login/signup
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error:", error.response.data.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto py-10 my-20 px-8 border border-black shadow-lg"
    >
      {isSignUp && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-black rounded"
            required
          />
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Email/Username</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-black rounded"
          autoComplete="username"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold">Password</label>
        <input
          type="password"
          value={password}
          minLength="8"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-black rounded"
          autoComplete="current-password"
          required
        />
      </div>
      {isSignUp && (
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">
            Profile Photo (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full p-2 border border-black rounded"
          />
          {photoError && (
            <p className="text-red-500 text-sm mt-1">{photoError}</p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      <p
        className="cursor-pointer hover:text-blue-700 hover:font-semibold text-center mt-4"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </form>
  );
};

export default LoginForm;
