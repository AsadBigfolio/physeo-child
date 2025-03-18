import { z } from "zod";

export const badgeCreateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Image is required"),
    status: z.string().min(1, "Status is required"),
    course: z.string().optional(),
    section: z.string().optional(),
});

export const badgeUpdateSchema = badgeCreateSchema.extend({
    id: z.string(),
});
export const badgeAwardedSchema = z.object({
    userId: z.string(),
});
export const badgeDeleteSchema = z.union([z.string(), z.array(z.string())])

export type BadgeCreateType = ReturnType<typeof badgeCreateSchema.parse>;
export type BadgeUpdateType = ReturnType<typeof badgeUpdateSchema.parse>;
export type BadgeAwardedType = ReturnType<typeof badgeAwardedSchema.parse>;
export type BadgeDeleteType = ReturnType<typeof badgeDeleteSchema.parse>
