"use client";
import React, { useContext, useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from 'sonner';
import BadgeFormView from '@/components/BadgeFormView';
import { useBadgeStore } from '@/providers/BadgeProvider';

const AddBadge = ({ params }) => {
    const { badge, courses } = useBadgeStore();

    const { mutate, data, isPending, error } = trpc.badge.update.useMutation({
        onSuccess: () => {
            toast.success("Badge updated successfully!");
        },
    });
    const breadcrumbs = [
        {
            label: "Badges",
            destination: "/admin/badges",
        },
        {
            label: "Update Badge",
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
            id: badge.id,
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
                    title: "Update Badge",
                    primaryAction: {
                        content: "Update",
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