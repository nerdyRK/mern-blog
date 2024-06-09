import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  //   console.log(blog.title);
  return (
    <div className="max-w-[400px] sm:w-1/3 md:1/4 w-full shadow-lg p-2 border-black border">
      <h1>{blog.title}</h1>
      <img className="w-full h-40 bg-slate-500 bg-opacity-40" src="" alt="" />
      <Link to={`/blog/${blog.id}`}>
        {" "}
        <p className="truncate">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
          recusandae magni exercitationem officia maiores laborum, unde
          repellendus quam velit aspernatur veniam expedita veritatis aliquam
          neque sequi modi, dolorem natus aliquid sed quidem beatae excepturi
          officiis quasi. Officiis magni, perspiciatis dolorem, sunt beatae
          eveniet a veritatis voluptate voluptatibus accusantium molestias
          commodi.
        </p>
      </Link>
    </div>
  );
};
export default BlogCard;
