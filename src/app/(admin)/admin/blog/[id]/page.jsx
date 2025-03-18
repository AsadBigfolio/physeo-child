"use client";

import React, { useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from "sonner";
import { useBlogStore } from "@/providers/BlogProvider";
import BlogFormView from "@/components/BlogFormView";

const breadcrumbs = [
  {
    label: "Blog",
    destination: "/admin/blog",
  },
  {
    label: "Update Blog",
    destination: "/admin/blog/update",
  },
];

const UpdateBlogPage = () => {
  const { blog } = useBlogStore();

  const { mutate, data, isPending, error } = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Blog updated successfully!");
    },
  });

  const formattedErrors = useMemo(() => {
    return (
      safeJSONParse(error?.message)?.reduce((acc, error) => {
        acc[error.path.join("_")] = error.message;
        return acc;
      }, {}) || {}
    );
  }, [error]);

  const onAction = () => {
    mutate({
      ...blog,
      id: blog._id,
      image: blog.image ? blog.image._id : '',
    });
  };

  return (
    <Page
      header={{
        backAction: {
          url: "/admin/blog",
        },
        title: "Update Blog",
        primaryAction: {
          content: "Save",
          type: "button",
          onAction,
          loading: isPending,
        },
      }}
      fullWidth={false}
      breadcrumbs={breadcrumbs}
    >
      <BlogFormView formattedErrors={formattedErrors} />
    </Page>
  );
};

export default UpdateBlogPage;
