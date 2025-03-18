import BlogProvider from "@/providers/BlogProvider";
import { getBlogById } from "@/queries/blog/getBlogs";

const layout = async ({ children, params: { id } }) => {
  const blogData = await getBlogById(id);
  const blog = JSON.parse(blogData);
  return <BlogProvider defaultBlog={blog}>{children}</BlogProvider>;
};
export default layout;
