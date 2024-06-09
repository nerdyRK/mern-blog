import BlogCard from "./BlogCard";

const BlogSection = ({ title, blogs }) => {
  return (
    <div className="max-w-[1300px] mt-6 mx-auto">
      <h1 className="text-3xl mb-5">{title}</h1>
      <div className="flex gap-4 flex-wrap justify-center mx-auto max-w-full">
        {blogs?.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
