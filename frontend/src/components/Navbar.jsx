import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../services/axiosInstance";
import { logout } from "../store/authReducer";

const Navbar = () => {
  // const [showLinks, setShowLinks] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      // Make a request to backend logout route
      await axiosInstance.post("http://localhost:5000/auth/logout");
      console.log("logout");
      // Dispatch logout action to update Redux state
      dispatch(logout());
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error as needed
    }
  };

  // const handleClick = () => {
  //   setShowLinks(!showLinks); // Toggle the state to show/hide links
  // };

  return (
    <nav className="flex overflow-hidden relative text-center justify-between items-center sm:p-10 p-6 shadow-lg">
      <h1 className="justify-self-center text-3xl">Logo</h1>
      <ul className={`flex gap-6 justify-end`}>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}
        <NavLink onClick={handleLogout} to="/login">
          {isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
