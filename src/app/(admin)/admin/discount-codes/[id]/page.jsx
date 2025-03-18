"use client";

import React, { useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from "sonner";
import DiscountCodeFormView from '@/components/DiscountCodeFormView';
import { useAdminDiscountCodeStore } from '@/providers/DiscountCodeProvider';

const breadcrumbs = [
  {
    label: "Discount Codes",
    destination: "/admin/discount-codes",
  },
  {
    label: "Update Discount Code",
    destination: "/admin/discount-codes/update",
  },
];

const UpdateBlogPage = () => {
  const { discountCodeData } = useAdminDiscountCodeStore();
  const { mutate, isPending, error } = trpc.discountCode.update.useMutation({
    onSuccess: () => {
      toast.success("Discount Code updated successfully!");
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
      ...discountCodeData,
      id: discountCodeData._id,
      percentage: Number(discountCodeData.percentage ?? 0)
    });
  };
  return (
    <Page
      header={{
        backAction: {
          url: "/admin/discount-codes",
        },
        title: "Update Discount Code",
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
      <DiscountCodeFormView formattedErrors={formattedErrors} />
    </Page>
  );
};

export default UpdateBlogPage;
