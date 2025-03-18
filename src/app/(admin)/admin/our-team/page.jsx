import Page from "@/components/UI/Page";
import Table from './table';
import { getStories } from '@/queries/story/getStories';

const breadcrumbs = [
    {
        label: "Our Team",
        destination: "/admin/our-team",
    },
];

const page = async ({ searchParams }) => {
    const page = searchParams?.page ?? 1;
    const pageSize = searchParams?.limit ?? 10;
    const search = searchParams?.search ?? "";
    const stories = await getStories({ page, pageSize, search })

    return (
        <Page
            breadcrumbs={breadcrumbs}
            primaryAction={{
                content: "Add Member",
                url: "/admin/our-team/create",
            }}
        >
            <Table
                totalPages={stories?.totalPages}
                currentPage={stories?.currentPage}
                data={JSON.parse(JSON.stringify(stories?.stories)) ?? []}
                limit={pageSize}
                totalRows={stories?.totalStories}
            />
        </Page>
    );
};
export default page;
