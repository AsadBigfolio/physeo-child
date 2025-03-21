import CourseProvider from "@/providers/CourseProvider";
import getCourseById from "@/queries/course/getCourseById";
import { getAllCategories } from '@/trpc/course/controller';

const layout = async ({ children, params }) => {
  const { id } = params;
  const courseData = await getCourseById(id);

  const stringifyCourseData = JSON.stringify(courseData);
  const course = JSON.parse(stringifyCourseData);
  const category = await getAllCategories()
  return <CourseProvider defaultCourse={course} categories={category}>{children}</CourseProvider>;
};
export default layout;
