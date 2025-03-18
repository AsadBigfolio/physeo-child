"use client";

import React, { useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from "sonner";
import DiscountCodeFormView from '@/components/DiscountCodeFormView';

const breadcrumbs = [
  {
    label: "Discount Code",
    destination: "/admin/discount-codes",
  },
  {
    label: "Add Discount Code",
    destination: "/admin/discount-codes/create",
  },
];

const CreateDiscountCodePage = () => {

  const { mutate, data, isPending, error } = trpc.discountCode.create.useMutation({
    onSuccess: () => {
      toast.success("Discount Code added successfully!");
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

  const onSubmit = (data) => {
    let formData = {};
    [...data.keys()].forEach((key) => {
      formData[key] = data.get(key)
    });
    formData.selected = formData.selected === "true";
    formData.percentage = Number(formData.percentage)
    mutate(formData);
  }
  return (
    <form action={onSubmit}>
      <Page
        header={{
          backAction: {
            url: "/admin/discount-codes",
          },
          title: "Add Discount Code",
          primaryAction: {
            content: "Save",
            type: "submit",
            loading: isPending,
          },
        }}
        fullWidth={false}
        breadcrumbs={breadcrumbs}
      >

        <DiscountCodeFormView formattedErrors={formattedErrors} />
      </Page>
    </form>
  );
};

export default CreateDiscountCodePage;
