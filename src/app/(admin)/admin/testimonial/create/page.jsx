"use client";
import React, { useMemo } from "react";
import Page from "@/components/UI/Page";
import { trpc } from "@/utils/trpcClient";
import { safeJSONParse } from "@/utils/jsonParse";
import { toast } from 'sonner';
import TestimonialFormView from '@/components/TestimonialFormView';
import { useTestimonialStore } from '@/providers/TestimonialProvider';
import { useRouter } from 'next/navigation';

const AddTestimonial = () => {
    const { testimonial, } = useTestimonialStore();
    const router = useRouter()
    const { mutate, data, isPending, error } = trpc.testimonial.create.useMutation({
        onSuccess: () => {
            toast.success("Testimonial added successfully.");
            router.push('/admin/testimonial')
        },
    });
    const breadcrumbs = [
        {
            label: "Testimonials",
            destination: "/admin/testimonial",
        },
        {
            label: "Add Testimonials",
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
            image: testimonial.image ? testimonial?.image[0]?._id : null,
        });
    };
    return (
        <>
            <Page
                header={{
                    backAction: {
                        url: "/admin/testimonial",
                    },
                    title: "Add Testimonials",
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
                <TestimonialFormView formattedErrors={formattedErrors} />
            </Page>
        </>
    );
};

export default AddTestimonial;