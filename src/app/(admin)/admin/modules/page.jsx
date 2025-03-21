import getCourses from "@/queries/course/getCourses";
import CourseTable from "@/components/Course/CourseTable";
import { Suspense } from "react";
import Page from "@/components/UI/Page";
import Skeleton from "@/components/UI/ResourceList/Skeleton";

const breadcrumbs = [
  {
    label: "Modules",
    destination: "/admin/modules",
  },
];

const Module = ({ searchParams }) => {
  const limit = searchParams.limit || 25;
  const page = searchParams.page || 1;
  const search = searchParams.search || "";
  const coursesPromise = getCourses(limit, page, search);

  return (
    <>
      <Page
        primaryAction={{
          content: "Add Module",
          url: "/admin/modules/create",
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
export default Module;
