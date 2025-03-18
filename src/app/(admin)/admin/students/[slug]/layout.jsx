import StudentProvider from "@/providers/StudentProvider";
import getCourses from '@/queries/course/getCourses';
import { getUserById } from "@/queries/user/getUserById";
import { STANDARDPLAN } from '@/utils/constant';

const layout = async ({ children, params }) => {
  const standardPlanId = STANDARDPLAN
  try {
    const { slug } = params;
    const studentData = await getUserById(slug);

    const serializedStudentData = JSON.stringify(studentData);
    const studentDetails = JSON.parse(serializedStudentData);
    const optionMaker = (data) => {
      const coursesData = JSON.parse(data);
      const options = coursesData?.courses.map((item) => ({
        label: item?.title,
        value: item?._id
      }))
      return options?.length ? options : []
    }
    const coursesPromise = await getCourses(100, 1, '');
    const courses = optionMaker(coursesPromise)
    const selectedCourses = studentDetails?.subscribedPlans[0]?.plan === standardPlanId ? studentDetails?.subscribedPlans?.map((item) => ({ value: item?.course })) : []

    return (
      <StudentProvider defaultStudent={{ ...studentDetails, selectedCourses }} courses={courses}>
        {children}
      </StudentProvider>
    );
  } catch (err) {
    return <div>Could not fetch student</div>;
  }
};
export default layout;
