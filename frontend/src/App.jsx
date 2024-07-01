import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import SearchBar from "./components/Searchbar";
import { useEffect } from "react";
import { login, logout } from "./store/authReducer";

const App = () => {
  const location = useLocation();
  const showSearchBar = !location.pathname.startsWith("/dashboard");

  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log("verifying token...");
        const response = await fetch(
          "http://localhost:5000/auth/verify-token",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        // console.log("Token verification response with fetch:", data.user);
        dispatch(login(data.user));
      } catch (error) {
        dispatch(logout());
      }
    };

    verifyToken();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      {showSearchBar && <SearchBar />}
      <Outlet />
    </div>
  );
};
export default App;
