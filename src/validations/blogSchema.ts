import { z } from "zod";

export const blogCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image is required"),
  category: z.string().min(1, "Category is required"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  isFeatured: z.boolean().optional(),
  status: z.string().min(1, "Status is required"),
  tags: z.array(z.string()).optional(),
});

export const blogUpdateSchema = blogCreateSchema.extend({
  id: z.string(),
});

export const blogDeleteSchema = z.union([z.string(), z.array(z.string())])

export type BlogCreateType = z.infer<typeof blogCreateSchema>;
export type BlogUpdateType = z.infer<typeof blogUpdateSchema>;
export type BlogDeleteType = z.infer<typeof blogDeleteSchema>
