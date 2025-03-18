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
    label: "Add Blog",
    destination: "/admin/blog/create",
  },
];

const CreateBlogPage = () => {
  const { blog } = useBlogStore();

  const { mutate, data, isPending, error } = trpc.blog.create.useMutation({
    onSuccess: () => {
      toast.success("Blog added successfully!");
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
      image: blog.image ? blog.image._id : '',
    });
  };

  return (
    <Page
      header={{
        backAction: {
          url: "/admin/blog",
        },
        title: "Add Blog",
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

export default CreateBlogPage;
