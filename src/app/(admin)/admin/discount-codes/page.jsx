import Page from "@/components/UI/Page";
import Table from "./table";
import { getDiscountCodes } from '@/queries/discountCodes/getDiscountCodes';

const breadcrumbs = [
  {
    label: "Discount Codes",
    destination: "/admin/discount-codes",
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
  const discountCodes = await getDiscountCodes(page, pageSize, paramString);
  return (
    <Page
      breadcrumbs={breadcrumbs}
      primaryAction={{
        content: "Add Discount Code",
        url: "/admin/discount-codes/create",
      }}
    >
      <Table
        totalPages={discountCodes?.totalPages}
        currentPage={discountCodes?.currentPage}
        data={JSON.parse(JSON.stringify(discountCodes?.discountCodes)) ?? []}
        totalRows={discountCodes?.totalBlogs}
      />
    </Page>
  );
};
export default page;
