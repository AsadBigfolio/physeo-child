import getCourses from "@/queries/course/getCourses";
import CourseTable from "@/components/Course/CourseTable";
import { Suspense } from "react";
import Page from "@/components/UI/Page";
import Skeleton from "@/components/UI/ResourceList/Skeleton";

const breadcrumbs = [
  {
    label: "Courses",
    destination: "/admin/courses",
  },
];

const Course = ({ searchParams }) => {
  const limit = searchParams.limit || 25;
  const page = searchParams.page || 1;
  const search = searchParams.search || "";
  const coursesPromise = getCourses(limit, page, search);

  return (
    <>
      <Page
        primaryAction={{
          content: "Add Course",
          url: "/admin/courses/create",
        }}
        breadcrumbs={breadcrumbs}
      >
        <Suspense
          fallback={<Skeleton columns={5} rowPadding={20} />}
          key={`${limit}${page}${search}`}
        >
          {coursesPromise.then((courses) => (
            <CourseTable courseData={JSON.parse(courses)} />
          ))}
        </Suspense>
      </Page>
    </>
  );
};
export default Course;
