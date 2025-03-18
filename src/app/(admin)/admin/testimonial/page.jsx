import Page from "@/components/UI/Page";
import Table from './table';
import { getTestimonials } from '@/queries/testimonial/getTestimonials';

const breadcrumbs = [
    {
        label: "Testimonials",
        destination: "/admin/testimonial",
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
    const testimonials = await getTestimonials(page, pageSize, paramString)

    return (
        <Page
            breadcrumbs={breadcrumbs}
            primaryAction={{
                content: "Add Testimonials",
                url: "/admin/testimonial/create",
            }}
        >
            <Table
                totalPages={testimonials?.totalPages}
                currentPage={testimonials?.currentPage}
                data={JSON.parse(JSON.stringify(testimonials?.testimonials)) ?? []}
                totalRows={testimonials?.totalTestimonials}
            />
        </Page>
    );
};
export default page;