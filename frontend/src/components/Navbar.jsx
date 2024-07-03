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
    <nav className="flex overflow-hidden relative text-center justify-between items-center sm:p-10 px-4 py-6 shadow-lg">
      <h1 className="justify-self-center text-3xl">Logo</h1>
      <ul className={`flex sm:gap-6 justify-end`}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "block py-2.5 px-4 rounded transition text-white duration-200 bg-gray-700"
              : "block py-2.5 px-4 rounded transition duration-200 hover:text-white hover:bg-gray-700"
          }
          to="/"
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "block py-2.5 px-2 rounded transition duration-200 text-white bg-gray-700"
                : "block py-2.5 px-2 rounded transition duration- hover:text-white hover:bg-gray-700"
            }
            to="/dashboard/profile"
          >
            Dashboard
          </NavLink>
        )}
        <NavLink
          onClick={handleLogout}
          className={({ isActive }) =>
            isActive
              ? "block py-2.5 px-4 rounded transition duration-200 bg-gray-700"
              : "block py-2.5 px-4 rounded transition duration-200 hover:text-white hover:bg-gray-700"
          }
          to="/login"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
