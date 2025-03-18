import { Blog } from "@/models"
import { BlogCreateType, BlogDeleteType, BlogUpdateType, blogDeleteSchema } from "@/validations/blogSchema";

export const createBlog = async (blog: BlogCreateType) => {
  try {
    const newBlog = await Blog.create(blog);

    return { blog: newBlog };
  } catch (error) {
    throw new Error(`Failed to create blog: ${error.message}`);
  }
};

export const updateBlog = async (blog: BlogUpdateType) => {
  const { id, ...rest } = blog;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, rest, { new: true });

    if (!updatedBlog) {
      throw new Error("Blog not found.");
    }

    return { blog: updatedBlog };
  } catch (error) {
    throw new Error(`Failed to update blog: ${error.message}`);
  }
};
export const deleteBlog = async (ids: BlogDeleteType) => {
  try {
    if (Array.isArray(ids)) {
      const deletedBlogs = await Blog.deleteMany({ _id: { $in: ids } });
      if (deletedBlogs.deletedCount === 0) {
        throw new Error("No blogs found to delete.");
      }
      return { message: `${deletedBlogs.deletedCount} blog(s) deleted.` };
    } else {
      const deletedBlog = await Blog.findByIdAndDelete(ids);
      if (!deletedBlog) {
        throw new Error("Blog not found.");
      }
      return { message: "Blog deleted." };
    }
  } catch (error) {
    throw new Error(`Failed to delete blog: ${error.message}`);
  }
};
