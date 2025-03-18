import { z } from "zod";

export const getStorySchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  searchQuery: z.string().optional(),
});

export const deleteStorySchema = z.object({
  id: z.string()
});

export type GetStoryType = z.infer<typeof getStorySchema>;
