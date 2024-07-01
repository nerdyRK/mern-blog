import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../services/axiosInstance"; // Assuming axiosInstance setup for API calls
import { logout } from "../store/authReducer";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Make a request to backend logout route
      await axiosInstance.post("http://localhost:5000/auth/logout");

      // Dispatch logout action to update Redux state
      dispatch(logout());
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error as needed
    }
  };

  const handleClick = () => {
    setShowLinks(!showLinks); // Toggle the state to show/hide links
  };

  return (
    <nav className="sm:flex overflow-hidden relative block text-center justify-between sm:p-10 p-6 shadow-lg">
      <h1>Logo</h1>
      <div
        onClick={handleClick} // Handle click to toggle showLinks state
        className="icon p-2 text-lg absolute right-4 top-2 sm:hidden border-2 cursor-pointer"
      >
        {showLinks ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`sm:flex gap-6 hidden`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
        <NavLink onClick={handleLogout} to="/login">
          {isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </ul>

      <ul
        className={`sm:hidden ${
          showLinks ? "max-h-screen" : "max-h-0"
        } gap-6 flex flex-col mt-2 transition-all overflow-hidden duration-500`}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink onClick={handleLogout} to="/login">
          {isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
