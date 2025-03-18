"use client";

import { useContext, useMemo } from "react";
import Page from "@/components/UI/Page";
import StudentContext from "@/context/studentContext";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from "sonner";
import StudentFormView from "@/components/Students/StudentFormView";

const UpdateStudent = ({ params }) => {
  const { slug } = params;
  const { mutate, data, isPending, error } = trpc.user.updateStudent.useMutation({
    onSuccess: () => {
      toast.success("Student updated successfully!");
    },
  });
  const { data: plans } = trpc.plan.get.useQuery();
  const { student, courses } = useContext(StudentContext);
  const refineCourses = () => {
    const result = student?.selectedCourses?.map((item) => item?.value && item.value).filter((value) => value != null)
    return result.length ? result : []
  }
  const refinePlans = () => {
    return typeof (student?.subscribedPlans[0]) === 'string' ? [student?.subscribedPlans[0]] : [student?.subscribedPlans[0]?.plan]
  }

  const formattedErrors = useMemo(() => {
    return (
      safeJSONParse(error?.message)?.reduce((acc, error) => {
        acc[error.path.join("_")] = error.message;
        return acc;
      }, {}) || {}
    );
  }, [error]);

  return (
    <Page
      header={{
        backAction: {
          url: "/admin/students",
        },
        title: "Update Student",
        primaryAction: {
          content: "Save",
          type: "button",
          onAction: () => {
            mutate({ ...student, courses: refineCourses(), subscribedPlans: refinePlans() });
          },
          loading: isPending,
        },
      }}
      fullWidth={false}
      // breadcrumbs={breadcrumbs}
    >
      <StudentFormView plans={plans} courses={courses} formattedErrors={formattedErrors} />
    </Page>
  );
};

export default UpdateStudent;
