import { useParams } from "react-router-dom";
import data from "../services/blogData";

const Blog = () => {
  const { id } = useParams();
  const blog = data.find((blog) => blog.id == id);

  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div className=" w-4/5 mx-auto my-10 p-10 flex flex-col gap-y-6 shadow-lg border-black border">
      <h1>{blog.title}</h1>
      <img className="w-full h-40 bg-slate-500 bg-opacity-40" src="" alt="" />

      <p className="">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
        recusandae magni exercitationem officia maiores laborum, unde
        repellendus quam velit aspernatur veniam expedita veritatis aliquam
        neque sequi modi, dolorem natus aliquid sed quidem beatae excepturi
        officiis quasi. Officiis magni, perspiciatis dolorem, sunt beatae
        eveniet a veritatis voluptate voluptatibus accusantium molestias
        commodi.
      </p>
    </div>
  );
};
export default Blog;
