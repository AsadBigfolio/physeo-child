import Page from "@/components/UI/Page";
import Table from "./table";
import { getInfluencersList } from '@/trpc/referral/controller';

const breadcrumbs = [
  {
    label: "Influencer",
    destination: "/admin/influencer",
  },
];


const page = async ({ searchParams }) => {
  const page = searchParams?.page ?? 1;
  const pageSize = searchParams?.limit ?? 10;
  const influencers = await getInfluencersList(page, pageSize);
  return (
    <Page
      breadcrumbs={breadcrumbs}
    >
      <Table
        totalPages={influencers?.totalPages}
        currentPage={influencers?.currentPage}
        data={JSON.parse(JSON.stringify(influencers?.influencers)) ?? []}
        totalRows={influencers?.totalInfluencers}
      />
    </Page>
  );
};

export default page;
