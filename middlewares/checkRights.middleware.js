import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

const checkRights = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user.id;

      let resource;
      if (resourceType === "blog") {
        resource = await Blog.findById(resourceId);
      } else if (resourceType === "comment") {
        resource = await Comment.findById(resourceId);
      }

      if (!resource) {
        return res.status(404).json({
          message: `${
            resourceType.charAt(0).toUpperCase() + resourceType.slice(1)
          } not found`,
        });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isOwner =
        (resourceType === "blog" && resource.author.toString() === userId) ||
        (resourceType === "comment" && resource.author.toString() === userId);

      if (!isOwner && user.role !== "admin") {
        return res
          .status(403)
          .json({ message: "Not authorized to perform this action" });
      }
      console.log("checked rights");
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

export default checkRights;
