import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import AllRecommendedBlogs from "./components/AllRecommendedBlogs.jsx";
import AllRecentBlogs from "./components/AllRecentBlogs.jsx";
import AllTrendingBlogs from "./components/AllTrendingBlogs.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SearchResults from "./components/SearchResults.jsx";
import Profile from "./pages/Profile.jsx";
import Stats from "./pages/Stats.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/recommended", element: <AllRecommendedBlogs /> },
      { path: "/trending", element: <AllTrendingBlogs /> },
      { path: "/recent", element: <AllRecentBlogs /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/blog/:id", element: <Blog /> },
      { path: "/search", element: <SearchResults /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          { path: "stats", element: <Stats /> },
          { path: "", index: true, element: <Profile /> },
          { path: "profile", element: <Profile /> },
          { path: "create-blog", element: <CreateBlog /> },
          { path: "delete-account", element: <DeleteAccount /> },
        ],
      },
    ],
  },
  { path: "*", element: <div>Not Found</div> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
