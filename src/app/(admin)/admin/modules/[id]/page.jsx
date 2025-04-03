"use client";

import { useMemo } from "react";
import CourseFormView from "@/components/Course/CourseFormView";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { toast } from "sonner";
import { useCourseStore } from "@/providers/CourseProvider";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { useRouter } from "next/navigation";

const UpdateCourse = () => {
  const router = useRouter();
  const { mutateAsync, data, isPending, error } = trpc.course.update.useMutation({
    onSuccess: () => {
      toast.success("Course updated successfully!");

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
      label: "Modules",
      destination: "/admin/modules",
    },
    {
      label: course.title,
      destination: "/admin/modules/" + course._id,
    },
  ];
  return (
    <Page
      header={{
        backAction: {
          url: "/admin/modules",
        },
        title: "Update Module",
        primaryAction: {
          content: "Save",
          type: "button",
          disabled: isDisabled,
          onAction: async () => {
            await mutateAsync(course);
            // setTimeout(() => {
            //   router.push("/admin/courses");
            // }, 100);
          },
          loading: isPending,
        },
        secondaryActions: [
          {
            content: "View",
            url: "/modules/" + course.slug,
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
