import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import AllRecommendedBlogs from "./components/AllRecommendedBlogs.jsx";
import AllRecentBlogs from "./components/AllRecentBlogs.jsx";
import AllTrendingBlogs from "./components/AllTrendingBlogs.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/recommended",
        element: <AllRecommendedBlogs />,
      },
      {
        path: "/trending",
        element: <AllTrendingBlogs />,
      },
      {
        path: "/recent",
        element: <AllRecentBlogs />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
    ],
  },

  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
