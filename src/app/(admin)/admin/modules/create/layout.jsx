import CourseProvider from "@/providers/CourseProvider";
import { getAllCategories } from '@/trpc/course/controller';

const layout = async ({ children }) => {
  const category = await getAllCategories()
  return <CourseProvider categories={category}>{children}</CourseProvider>;
};
export default layout;
