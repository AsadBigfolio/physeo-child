import { Blog } from "@/models"

export const getBlogs = async (page = 1, pageSize = 10, searchQuery = "") => {
  try {
    const query: any = {};
    const searchParams = new URLSearchParams(searchQuery);
    for (const [key, value] of searchParams.entries()) {
      if (key !== "search") {
        query[key.toLowerCase()] = { $regex: value, $options: "i" };
      } else {
        query.title = { $regex: value, $options: "i" };
      }
    }
    const skip = (page - 1) * pageSize;
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate("image");

    const totalBlogs = await Blog.countDocuments(query);

    if (!blogs.length) {
      return { blogs: [] };
    }

    return {
      blogs,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBlogById = async (id: string) => {
  try {
    const blog = await Blog.findById(id).populate("image");
    if (!blog) {
      throw new Error("Blog not found.");
    }
    return JSON.stringify(blog);
  } catch (error) {
    throw new Error(`Failed to get blog by id: ${error.message}`);
  }
};

export const getBlogDetail = async (slug: string) => {
  try {
    const blog = await Blog.findOne({ slug, status: "published" }).populate("image");

    if (!blog) {
      throw new Error("Blog not found.");
    }

    const relatedBlogs = await Blog.find({
      category: blog?.category,
      _id: { $ne: blog._id } 
    }).populate("image");

    return {
      blog,
      relatedBlogs,
    };
  } catch (error) {
    return {
      blog: {},
      relatedBlogs: [],
    };
  }
};

export const getAllBlogsWithoutPagination = async (searchQuery: any) => {
  try {
    const searchCondition = searchQuery
      ? {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { slug: { $regex: searchQuery, $options: 'i' } },
        ],
      }
      : {};

    const blogs = await Blog.find(searchCondition).populate("image");;
    return blogs;
  } catch (error) {
    return []
  }
};
