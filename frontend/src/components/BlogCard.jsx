import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment, FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

const BlogCard = ({ blog }) => {
  const [creationTime, setCreationTime] = useState(
    formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })
  );

  useEffect(() => {
    let animationFrameId;

    const updateCreationTime = () => {
      setCreationTime(
        formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })
      );
      animationFrameId = requestAnimationFrame(updateCreationTime);
    };

    animationFrameId = requestAnimationFrame(updateCreationTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, [blog.createdAt]);

  return (
    <div className="max-w-[300px] rounded-lg md:min-w-[300px] min-w-[250px] shadow-lg border-black border">
      <img
        className="w-full rounded-tl-lg rounded-tr-lg h-40 object-cover bg-slate-500 bg-opacity-40"
        src={blog.blogImage}
        alt=""
      />
      <div className="p-2">
        <h1 className="text-2xl font-bold pb-2">
          {blog?.title[0].toUpperCase() + blog?.title.slice(1)}
        </h1>
        <Link to={`/blog/${blog._id}`}>
          <p className="truncate">{blog?.content}</p>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center pt-2">
            <div className="flex items-center">
              <FaThumbsUp className="mr-1 text-blue-500" />
              <span>{blog.likes}</span>
            </div>
            <div className="flex items-center">
              <FaComment className="mr-1 text-gray-500" />
              <span>{blog.comments}</span>
            </div>
            <div className="flex items-center">
              <FaBookmark className="mr-1 text-yellow-500" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">{creationTime}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
