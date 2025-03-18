import { Course } from "@/models";

export const getCourseBySlug = async (courseSlug: string) => {
  const decodedSlug = decodeURIComponent(courseSlug);

  try {
    const course = await Course.findOne({ slug: decodedSlug })
      .populate({
        path: "sections",
        populate: [
          {
            path: "videos",
            model: "Video",
            populate: {
              path: "thumbnail",
              model: "File",
            },
          },
          {
            path: "quiz",
            model: "Quiz",
          },
        ],
      })
      .populate("image")
      .exec();

    if (!course) {
      return { error: "No Course Found" };
    }

    return course;
  } catch (error) {
    console.error("Error fetching course:", error.message);
    throw error;
  }
};

export default getCourseBySlug;
