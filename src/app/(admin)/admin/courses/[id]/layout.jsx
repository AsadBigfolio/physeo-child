import CourseProvider from "@/providers/CourseProvider";
import getCourseById from "@/queries/course/getCourseById";

const layout = async ({ children, params }) => {
  const { id } = params;
  const courseData = await getCourseById(id);

  const stringifyCourseData = JSON.stringify(courseData);
  const course = JSON.parse(stringifyCourseData);
  return <CourseProvider defaultCourse={course}>{children}</CourseProvider>;
};
export default layout;
