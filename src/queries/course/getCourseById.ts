import { Course } from "@/models";

export const getCourseById = async (courseId: string) => {
  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "sections",
        populate: [
          {
            path: "videos",
            model: "Video",
            populate: [{
              path: "thumbnail",
              model: "File",
            },
              {
                path: "quiz",
                model: "Quiz",
              }
            ]
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

export default getCourseById;
