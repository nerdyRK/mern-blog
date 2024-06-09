import RecentBlogs from "../components/Recentblogs";
import Recommended from "../components/RecommendedBlogs";
import Trendingblogs from "../components/TrendingBlogs";
import blogData from "../services/blogData";

const Home = () => {
  return (
    <div className="py-10">
      <Recommended data={blogData.slice(0, 3)} />
      <Trendingblogs data={blogData.slice(0, 3)} />
      <RecentBlogs data={blogData.slice(0, 3)} />
    </div>
  );
};
export default Home;
