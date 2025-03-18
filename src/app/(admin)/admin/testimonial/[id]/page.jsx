"use client";
import React, { useContext, useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from 'sonner';
import TestimonialFormView from '@/components/TestimonialFormView';
import { useTestimonialStore } from '@/providers/TestimonialProvider';

const AddBadge = ({ params }) => {
    const { testimonial } = useTestimonialStore();

    const { mutate, data, isPending, error } = trpc.testimonial.update.useMutation({
        onSuccess: () => {
            toast.success("testimonial updated successfully!");
        },
    });
    const breadcrumbs = [
        {
            label: "Testimonials",
            destination: "/admin/testimonial",
        },
        {
            label: "Update Badge",
            destination: "/admin/testimonial/create",
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
            ...testimonial,
            id: testimonial._id,
            image: testimonial.image ? testimonial.image[0]?._id : null,
        });
    };
    return (
        <>
            <Page
                header={{
                    backAction: {
                        url: "/admin/testimonial",
                    },
                    title: "Update Testimonials",
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
                <TestimonialFormView formattedErrors={formattedErrors} />
            </Page>
        </>
    );
};

export default AddBadge;