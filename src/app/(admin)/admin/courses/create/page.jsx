"use client";

import React, { useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import CourseFormView from "@/components/Course/CourseFormView";
import { toast } from "sonner";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { useCourseStore } from "@/providers/CourseProvider";
import { useRouter } from "next/navigation";

const breadcrumbs = [
  {
    label: "Courses",
    destination: "/admin/courses",
  },
  {
    label: "Add Course",
    destination: "/admin/courses/create",
  },
];

const AddCourse = () => {
  const router = useRouter();
  const { course, validationErrors, isDisabled } = useCourseStore();

  const { mutate, data, isPending, error } = trpc.course.create.useMutation({
    onSuccess: () => {
      toast.success("Course added successfully!");
      router.push("/admin/courses");
    },
  });

  const formattedErrors = useMemo(() => formatErrors(error), [error]);
  const formattedValidationErrors = useMemo(
    () => formatErrors(validationErrors),
    [validationErrors]
  );

  return (
    <Page
      header={{
        backAction: {
          url: "/admin/courses",
        },
        title: "Add Course",
        primaryAction: {
          content: "Save",
          type: "button",
          disabled: isDisabled,
          onAction: () => {
            mutate(course);
          },
          loading: isPending,
        },
      }}
      fullWidth={false}
      breadcrumbs={breadcrumbs}
    >
      <CourseFormView
        formattedErrors={formattedErrors}
        formattedValidationErrors={formattedValidationErrors}
      />
    </Page>
  );
};

export default AddCourse;
