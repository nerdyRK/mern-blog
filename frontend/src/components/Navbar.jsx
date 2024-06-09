import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authReducer";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  // console.log(showLinks);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <nav className="sm:flex overflow-hidden relative block text-center justify-between sm:p-10 p-6 shadow-lg">
      <h1>Logo</h1>
      <div
        onClick={() => setShowLinks(!showLinks)}
        className="icon p-2 text-lg absolute right-4 top-2 sm:hidden border-2 cursor-pointer"
      >
        {showLinks ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`sm:flex gap-6 hidden`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink onClick={handleClick} to="/login">
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
        <NavLink onClick={handleClick} to="/login">
          {isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </ul>
    </nav>
  );
};
export default Navbar;
