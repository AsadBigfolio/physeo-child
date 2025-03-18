import { Course } from "@/models";

const listPublicCourses = async () => {
  try {
    const query = {
      status: "published",
    };

    const courses = await Course.find(query).populate("image", "src");

    return JSON.stringify({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};

export default listPublicCourses;
