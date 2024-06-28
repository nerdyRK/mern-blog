import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  //   console.log(blog.title);
  return (
    <div className="max-w-[400px] sm:w-1/3 md:1/4 w-full shadow-lg p-2 border-black border">
      <h1>{blog?.title}</h1>
      <img
        className="w-full h-40 bg-slate-500 bg-opacity-40"
        src={blog.blogImage}
        alt=""
      />
      <Link to={`/blog/${blog._id}`}>
        {" "}
        <p className="truncate">{blog?.content}</p>
      </Link>
    </div>
  );
};
export default BlogCard;
