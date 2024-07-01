import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment, FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateLikes } from "../store/blogReducer";

const BlogCard = ({ blog }) => {
  const [creationTime, setCreationTime] = useState(
    formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [liked, setLiked] = useState(blog.likes.includes(user?._id));
  // console.log(liked);
  const [likes, setLikes] = useState(blog.likes.length);

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

  const handleLike = async () => {
    if (user) {
      if (!user.name) {
        alert("You must be logged in to like a blog");
        return;
      }
      try {
        const response = await axios.post(
          `http://localhost:5000/blog/like/${blog._id}`,
          {},
          { withCredentials: true }
        );
        setLikes(response.data.likes);
        setLiked(!liked);
        dispatch(updateLikes({ blogId: blog._id, likes: response.data.likes }));
      } catch (error) {
        console.error("Error liking the post", error);
      }
    } else {
      // Handle not logged in case (e.g., show a login prompt)
      console.log("User not logged in");
    }
  };

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
              <FaThumbsUp
                className={`mr-1 ${liked ? "text-blue-500" : "text-gray-500"}`}
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              />
              <span>{likes}</span>
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
