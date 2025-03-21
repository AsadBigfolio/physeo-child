import { Course } from "@/models"

const getCourses = async (limit: number, page: number, search: string) => {
  try {
    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / limit);
    const courses = await Course.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("image", "src")
      .populate("category", "title");
    return JSON.stringify({ courses, totalPages, totalCourses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};

export default getCourses;
