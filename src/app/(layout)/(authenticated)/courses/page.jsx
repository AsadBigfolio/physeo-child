import CourseList from "@/components/CourseList";
import Banner from "@/components/UI/Banner";
import listPublicCourses from "@/queries/course/listPublicCourses";

export const metadata = {
  title: 'Dashboard',
  description: "Super Natural",
};
const page = async () => {
  const coursesData = await listPublicCourses()
  const parsedCourseData = await JSON.parse(coursesData)
  return (
    <>
      <Banner title="Courses" />
      <div className="max-w-[1320px] px-[20px] py-[20px] md:py-[80px] mx-auto">
        <CourseList courses={parsedCourseData.courses} />
      </div>
    </>
  );
};
export default page;
