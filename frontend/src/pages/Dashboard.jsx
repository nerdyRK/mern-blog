import { useEffect } from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col sm:flex-row">
      {/* Sidebar */}
      <aside className="md:min-w-64 max-w-full bg-gray-800 text-white flex-shrink-0">
        <div className="px-4 py-6 sm:mt-10">
          <nav className="flex sm:flex-col flex-1 gap-y-2 items-center sm:min-h-screen">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? "block py-2.5 px-4 rounded transition duration-200 bg-gray-700"
                  : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/stats"
              className={({ isActive }) =>
                isActive
                  ? "block py-2.5 px-4 rounded transition duration-200 bg-gray-700"
                  : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              }
            >
              Stats
            </NavLink>
            <NavLink
              to="/dashboard/create-blog"
              className={({ isActive }) =>
                isActive
                  ? "block py-2.5 px-4 rounded transition duration-200 bg-gray-700"
                  : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              }
            >
              Create Blog
            </NavLink>
            <NavLink
              to="/dashboard/delete-account"
              className={({ isActive }) =>
                isActive
                  ? "block py-2.5 px-4 rounded transition duration-200 bg-gray-700"
                  : "block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              }
            >
              Delete Account
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-2 sm:p-8">
        <section className="mt-8">
          {/* Outlet to render nested routes */}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
