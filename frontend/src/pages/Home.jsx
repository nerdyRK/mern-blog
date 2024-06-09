import RecentBlogs from "../components/Recentblogs";
import Recommended from "../components/RecommendedBlogs";
import Trendingblogs from "../components/TrendingBlogs";
import blogData from "../services/blogData";

const Home = () => {
  return (
    <div className="py-10">
      <Recommended data={blogData} />
      <Trendingblogs data={blogData} />
      <RecentBlogs data={blogData} />
    </div>
  );
};
export default Home;
