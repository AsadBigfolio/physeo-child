import CourseProvider from "@/providers/CourseProvider";

const layout = ({ children }) => {
  return <CourseProvider>{children}</CourseProvider>;
};
export default layout;
