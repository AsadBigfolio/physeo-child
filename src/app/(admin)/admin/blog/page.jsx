import Page from "@/components/UI/Page";
import { getBlogs } from "@/queries/blog/getBlogs";
import Table from "./table";

const breadcrumbs = [
  {
    label: "Blog",
    destination: "/admin/blog",
  },
];
const paramMaker = (searchParams) => {
  let index = 0;
  let paramString = "";
  for (let key in searchParams) {
    if (key !== "" && key !== "page" && key !== "limit") {
      paramString =
        paramString + `${index === 0 ? "" : "&"}${key}=${searchParams[key]}`;
      index++;
    }
  }
  return paramString;
};
const page = async ({ searchParams }) => {
  const page = searchParams?.page ?? 1;
  const pageSize = searchParams?.limit ?? 10;
  const paramString = paramMaker(searchParams);
  const blogs = await getBlogs(page, pageSize, paramString);
  return (
    <Page
      breadcrumbs={breadcrumbs}
      primaryAction={{
        content: "Add Blog",
        url: "/admin/blog/create",
      }}
    >
      <Table
        totalPages={blogs?.totalPages}
        currentPage={blogs?.currentPage}
        data={JSON.parse(JSON.stringify(blogs?.blogs)) ?? []}
        totalRows={blogs?.totalBlogs}
      />
    </Page>
  );
};
export default page;
