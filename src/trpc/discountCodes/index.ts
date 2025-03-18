import { getBlogs, getBlogById, getAllBlogsWithoutPagination } from "@/queries/blog/getBlogs";
import { createDiscount, deleteDiscountCode, updateDiscountCode } from "./controller";
import { z } from "zod";
import { publicProcedure, router, protectedProcedure } from "../init";
import { discountCodeCreateSchema, selectDiscountCodeSchema, discountCodeUpdateSchema, disCountCodeDeleteSchema } from '@/validations/discountCodeSchema';
import { selectDiscountCode } from '@/queries/discountCodes/selectDiscountCode';
import { selectedDiscount } from '@/queries/discountCodes/getSelectedDiscount';

const discountCodeRouter = router({
  get: publicProcedure
    .input(
      z.object({
        page: z.number(),
        pageSize: z.number(),
        search: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const { page, pageSize, search } = input;
      return getBlogs(page, pageSize, search);
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      const { id } = input;
      return getBlogById(id);
    }),

  create: protectedProcedure
    .input(discountCodeCreateSchema)
    .mutation(({ input }) => createDiscount(input)),

  update: protectedProcedure
    .input(discountCodeUpdateSchema)
    .mutation(({ input }) => updateDiscountCode(input)),
  delete: protectedProcedure
    .input(disCountCodeDeleteSchema)
    .mutation(({ input }) => deleteDiscountCode(input)),
  getAllBlogs: publicProcedure
    .input(z.object({
      search: z.string().optional(),
    }))
    .query(({ input }) => {
      const { search } = input;
      return getAllBlogsWithoutPagination(search ?? '');
    }),
  selectDiscountCode: protectedProcedure.input(selectDiscountCodeSchema).mutation(({ input }) => {
    return selectDiscountCode(input.id)
  }),
  selectedDiscount: publicProcedure.query(() => selectedDiscount())
});

export default discountCodeRouter;

export type DiscountCodeRouter = typeof discountCodeRouter;
