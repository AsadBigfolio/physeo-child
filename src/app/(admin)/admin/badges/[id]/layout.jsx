import BadgeProvider from '@/providers/BadgeProvider';
import { getBadgeById } from '@/queries/badge/getBadges';
import getCourses from '@/queries/course/getCourses';

const layout = async ({ children, params }) => {
  const { id } = params
  const badgeData = await getBadgeById(id)
  const optionMaker = (data) => {
    const coursesData = JSON.parse(data);
    const options = coursesData?.courses.map((item) => ({
      label: item?.title,
      value: item?._id
    }))
    return options?.length ? options : []
  }
  const serializedBadgeData = JSON.stringify(badgeData);
  const badgeDetails = JSON.parse(serializedBadgeData)
  const coursesPromise = await getCourses(100, 1, '');
  const courses = optionMaker(coursesPromise)
  const updatedData = {
    id: badgeDetails?._id,
    course: badgeDetails?.course?._id,
    title: badgeDetails?.title,
    image: badgeDetails?.image ? [badgeDetails?.image] : [],
    description: badgeDetails?.description,
    status: badgeDetails?.status,
    section: badgeDetails?.section
  }
  return <BadgeProvider defaultBadge={updatedData} courses={courses} >{children}</BadgeProvider>;
};
export default layout;
