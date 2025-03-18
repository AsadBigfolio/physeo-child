import Link from "next/link.js";
const BlogCard = ({ blog }) => {
  const dummyImageUrl = 'https://via.placeholder.com/369x287'
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <Link
      href={`/blog/${blog?.slug ?? 1}`}
      className="bg-white rounded-[10px] shadow-md overflow-hidden cursor-pointer"
    >
      <img
        className="w-full h-[140px] md:h-[198px] object-cover"
        src={blog?.image?.src ?? dummyImageUrl}
        alt={blog.title}
      />
      <div className="p-[10px]">
        <h3 className="text-base md:text-lg line-clamp-1 font-semibold text-[#202020CC] leading-tight capitalize">
          {blog.title}
        </h3>
        <p className="text-xs font-semibold text-[#491A8B] mt-1">
          {formatDate(blog.createdAt)}{" "}
          {blog.comments && <span>({blog.comments})</span>}
        </p>
      </div>
    </Link>
  );
};
export default BlogCard;
