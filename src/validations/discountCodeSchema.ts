import { z } from "zod";

export const discountCodeCreateSchema = z.object({
  discountCode: z.string().min(1, "discountCode is required"),
  percentage: z.number(),
  selected: z.boolean().optional(),
});

export const discountCodeUpdateSchema = discountCodeCreateSchema.extend({
  id: z.string(),
});

export const selectDiscountCodeSchema = z.object({
  id: z.string(),
});

export const disCountCodeDeleteSchema = z.union([z.string(), z.array(z.string())])

export type DisCountCodeCreateType = z.infer<typeof discountCodeCreateSchema>;
export type DisCountCodeUpdateType = z.infer<typeof discountCodeUpdateSchema>;
export type DisCountCodeDeleteType = z.infer<typeof disCountCodeDeleteSchema>