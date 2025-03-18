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
  const { data: plans } = trpc.plan.get.useQuery();
  const { mutate, data, isPending, error } = trpc.user.createUser.useMutation({
    onSuccess: () => {
      toast.success("Student created successfully.");
    },
  });
  const { student } = useContext(StudentContext);

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
        title: "Create Student",
        primaryAction: {
          content: "Save",
          type: "button",
          onAction: () => {
            let copyData = { ...student }
            delete copyData['_id']
            copyData.consent = true
            mutate(copyData);
          },
          loading: isPending,
        },
      }}
      fullWidth={false}
    // breadcrumbs={breadcrumbs}
    >
      <StudentFormView edit={false} plans={plans} formattedErrors={formattedErrors} />
    </Page>
  );
};

export default UpdateStudent;
