import BlogsList from "@/components/BlogsList";
import Pagination from "@/components/Pagination";
import Banner from "@/components/UI/Banner";
import { getBlogs } from "@/queries/blog/getBlogs";

export const metadata = {
  title: 'Blog',
  description: "Super Natural",
};

const Blog = async ({ searchParams }) => {
  const page = searchParams?.page ?? 1;
  const pageSize = searchParams?.limit ?? 12;
  const blogs = await getBlogs(page, pageSize, '&status=publish');
  return (
    <div>
      <Banner title="Blog" />
      <div className="bg-secondaryWhite ">
        <div className="max-w-[1320px] px-[20px] py-[20px] md:py-[80px] mx-auto">
          <h1 className="text-heading-xl mb-[20px] md:mb-[50px]">
            <span >The </span>
            <span className="text-primary">Supernatural </span>
            <span >Blogs</span>
          </h1>
          <BlogsList blogs={JSON.parse(JSON.stringify(blogs?.blogs)) ?? []} />
          <div className="flex justify-center md:justify-end mt-5">
            {blogs?.totalPages > 1 &&
              <Pagination
                currentPage={blogs?.currentPage}
                totalPages={blogs?.totalPages}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default Blog;
