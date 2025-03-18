import BlogProvider from "@/providers/BlogProvider";

const CreateBlogLayout = async ({ children }) => {
  return <BlogProvider>{children}</BlogProvider>;
};
export default CreateBlogLayout;
