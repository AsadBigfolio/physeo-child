"use client";
import React, { useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from 'sonner';
import BadgeFormView from '@/components/BadgeFormView';
import { useBadgeStore } from '@/providers/BadgeProvider';

const AddBadge = () => {
    const { badge, courses } = useBadgeStore();
    const { mutate, data, isPending, error } = trpc.badge.create.useMutation({
        onSuccess: () => {
            toast.success("Badge added successfully!");
        },
    });
    const breadcrumbs = [
        {
            label: "Badges",
            destination: "/admin/badges",
        },
        {
            label: "Add Badge",
            destination: "/admin/badges/create",
        },
    ];

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
            ...badge,
            image: badge.image ? badge.image[0]?._id : null,
        });
    };
    return (
        <>
            <Page
                header={{
                    backAction: {
                        url: "/admin/badges",
                    },
                    title: "Add Badge",
                    primaryAction: {
                        content: "Save",
                        type: "button",
                        loading: isPending,
                        onAction
                    },
                }}
                fullWidth={false}
                breadcrumbs={breadcrumbs}
            >
                <BadgeFormView formattedErrors={formattedErrors} courses={courses} />
            </Page>
        </>
    );
};

export default AddBadge;