import { z } from "zod";

export const testimonialCreateSchema = z.object({
    userName: z.string().min(1, "Name is required"),
    message: z.string().min(1, "Message is required"),
    image: z.string().min(1, "Image is required"),
    status: z.string().min(1, "Status is required"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
});

export const testimonialUpdateSchema = testimonialCreateSchema.extend({
    id: z.string(),
});

export const testimonialDeleteSchema = z.union([z.string(), z.array(z.string())]);

export type TestimonialCreateType = ReturnType<typeof testimonialCreateSchema.parse>;
export type TestimonialUpdateType = ReturnType<typeof testimonialUpdateSchema.parse>;
export type TestimonialDeleteType = ReturnType<typeof testimonialDeleteSchema.parse>;
