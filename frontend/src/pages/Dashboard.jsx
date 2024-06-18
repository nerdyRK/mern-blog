import { useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <nav className="mt-10">
            <Link
              to="/dashboard/profile"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Profile
            </Link>
            <Link
              to="/dashboard/stats"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Stats
            </Link>
            <Link
              to="/dashboard/create-blog"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Create Blog
            </Link>
            <Link
              to="/dashboard/delete-account"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            >
              Delete Account
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <section className="mt-8">
          {/* Outlet to render nested routes */}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
