"use client";

import { useContext, useMemo } from "react";
import CourseFormView from "@/components/Course/CourseFormView";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from "sonner";
import { useCourseStore } from "@/providers/CourseProvider";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { useRouter } from "next/navigation";

const UpdateCourse = () => {
  const router = useRouter();
  const { mutate, data, isPending, error } = trpc.course.update.useMutation({
    onSuccess: () => {
      toast.success("Course updated successfully!");
      router.push("/admin/courses");
    },
  });
  const { course, validationErrors, isDisabled } = useCourseStore();

  const formattedErrors = useMemo(() => formatErrors(error), [error]);
  const formattedValidationErrors = useMemo(
    () => formatErrors(validationErrors),
    [validationErrors]
  );

  const breadcrumbs = [
    {
      label: "Courses",
      destination: "/admin/courses",
    },
    {
      label: course.title,
      destination: "/admin/courses/" + course._id,
    },
  ];
  return (
    <Page
      header={{
        backAction: {
          url: "/admin/courses",
        },
        title: "Update Course",
        primaryAction: {
          content: "Save",
          type: "button",
          disabled: isDisabled,
          onAction: () => {
            mutate(course);
          },
          loading: isPending,
        },
        secondaryActions: [
          {
            content: "View",
            url: "/courses/course/" + course.slug,
            external: true,
          },
        ],
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

export default UpdateCourse;
