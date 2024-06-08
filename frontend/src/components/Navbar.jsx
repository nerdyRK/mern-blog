import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between sm:p-10 p-6 shadow-lg">
      <h1>Logo</h1>
      <ul className="flex gap-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/login">Login</NavLink>
      </ul>
    </nav>
  );
};
export default Navbar;
