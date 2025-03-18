import React from "react";
import BlogCard from "../BlogCard";

export default function BlogsList({ blogs }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-x-7 gap-y-5 md:gap-y-10">
      {blogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
}
