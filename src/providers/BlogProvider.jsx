"use client";

import React, { useState, createContext, useContext } from "react";

const BlogContext = createContext({});

const initialState = {
  title: "",
  description: "",
  slug: "",
  category: "",
  image: null,
  status: "published",
  isFeatured: false,
  tags: [],
};

const BlogProvider = ({ children, defaultBlog = initialState }) => {
  const [blog, setBlog] = useState(defaultBlog);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const updateBlog = (data) => {
    let newData = { ...blog, ...data };

    if (data.title) {
      newData.slug = generateSlug(data.title);
    }
    
    setBlog(newData);
  };

  const contextValue = {
    blog,
    setBlog,
    updateBlog,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

export const useBlogStore = () => {
  if (!BlogContext) {
    throw new Error("useBlogStore must be used within a CourseProvider");
  }

  return useContext(BlogContext);
};

export default BlogProvider;
