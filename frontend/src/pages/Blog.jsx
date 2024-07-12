import { useParams } from "react-router-dom";
import defaultBlogImage from "../assets/defaultBlogImage.avif";
import useIdBlog from "../utils/useIdBlog";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading, error } = useIdBlog(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {blog ? (
        <div className="max-w-[1000px] mt-3 mx-auto border-2 border-black">
          <h1 className="text-3xl text-center p-4">{blog.title}</h1>
          <img
            src={blog.blogImage || defaultBlogImage}
            className="min-w-[80%] max-h-[400px] mx-auto object-cover"
            alt=""
          />
          <pre className="max-w-[80%] mx-auto p-4 whitespace-pre-wrap break-words">
            {blog.content}
          </pre>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default Blog;
