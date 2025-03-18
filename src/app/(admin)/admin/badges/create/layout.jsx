import BadgeProvider from '@/providers/BadgeProvider';
import getCourses from '@/queries/course/getCourses';

const layout = async ({ children, params }) => {
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
  return <BadgeProvider courses={courses} >{children}</BadgeProvider>;
};
export default layout;
