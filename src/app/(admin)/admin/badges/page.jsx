import Page from "@/components/UI/Page";
import Table from './table';
import { getBadges } from '@/queries/badge/getBadges';

const breadcrumbs = [
    {
        label: "Badges",
        destination: "/admin/badges",
    },
];
const paramMaker = (searchParams) => {
    let index = 0;
    let paramString = ''
    for (let key in searchParams) {
        if (key !== '' && key !== 'page' && key !== 'limit') {
            paramString = paramString + `${index === 0 ? "" : "&"}${key}=${searchParams[key]}`
            index++
        }
    }
    return paramString
}
const page = async ({ searchParams }) => {
    const page = searchParams?.page ?? 1;
    const pageSize = searchParams?.limit ?? 10;
    const paramString = paramMaker(searchParams)
    const badges = await getBadges(page, pageSize, paramString)
    return (
        <Page
            breadcrumbs={breadcrumbs}
            primaryAction={{
                content: "Add Badge",
                url: "/admin/badges/create",
            }}
        >
            <Table
                totalPages={badges?.totalPages}
                currentPage={badges?.currentPage}
                data={JSON.parse(JSON.stringify(badges?.badges)) ?? []}
                totalRows={badges?.totalBadges}
            />
        </Page>
    );
};
export default page;