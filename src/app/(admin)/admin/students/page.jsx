import { getUsers } from "@/queries/user/getAllUsers";
import StudentsTable from "@/components/Students/StudentsTable";
import Page from "@/components/UI/Page";

const breadcrumbs = [
  {
    label: "Students",
    destination: "/admin/students",
  },
];

const Students = async ({ searchParams }) => {
  const limit = searchParams.limit || 25;
  const page = searchParams.page || 1;
  const search = searchParams.search || ""
  const userPromise = await getUsers(limit, page, search);
  const users = JSON.parse(JSON.stringify(userPromise)) ?? []
  console.log(JSON.parse(users)?.users[0]?.subscribedPlans)
  return (
    <>
    <Page
        primaryAction={{
          content: "Add Student",
          url: "/admin/students/create",
        }}
      breadcrumbs={breadcrumbs}
      >
        <StudentsTable studentsData={JSON.parse(users)} />
    </Page>
    </>
  );
};
export default Students;
