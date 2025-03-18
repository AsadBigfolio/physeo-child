import { getUsers } from "@/queries/user/getAllUsers";
import Page from "@/components/UI/Page";
import NewsLetterTable from '@/components/NewsLetter';
import { getAllEmailUsers } from '@/trpc/newsLetter/controller';

const breadcrumbs = [
  {
    label: "News letter",
    destination: "/admin/news-letter",
  },
];

const Students = async ({ searchParams }) => {
  const limit = searchParams.limit || 25;
  const page = searchParams.page || 1;
  const search = searchParams.search || ""
  const userPromise = await getUsers(limit, page, search);
  const newsLetterUsersPromise = await getAllEmailUsers()
  const newsLetterUsers = JSON.parse(JSON.stringify(newsLetterUsersPromise)) ?? []
  let users = JSON.parse(JSON.stringify(userPromise)) ?? []
  console.log({ newsLetterUsers })
  return (
    <>
      <Page
        breadcrumbs={breadcrumbs}
      >
        <NewsLetterTable newsLetterUsers={newsLetterUsers} studentsData={JSON.parse(users)} />
      </Page>
    </>
  );
};
export default Students;
