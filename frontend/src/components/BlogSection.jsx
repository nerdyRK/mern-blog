import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const BlogSection = ({ title, blogs, linkTo, showAll = true }) => {
  return (
    <div className="max-w-[1300px] relative mt-6 mx-auto">
      <h1 className="text-3xl mb-5">{title}</h1>
      <div className="flex gap-4 flex-wrap justify-center mx-auto max-w-full">
        {blogs?.map((blog, i) => (
          <BlogCard blog={blog} key={blog._id} />
        ))}
      </div>
      <Link
        className={`${
          showAll ? "block" : "hidden"
        } absolute font-bold right-0 top-0`}
        to={`${linkTo}`}
      >
        See All
      </Link>
    </div>
  );
};

export default BlogSection;
