import { getBlogs, getBlogById, getAllBlogsWithoutPagination } from "@/queries/blog/getBlogs";
import { createBlog, deleteBlog, updateBlog } from "./controller";
import { z } from "zod";
import { blogCreateSchema, blogDeleteSchema, blogUpdateSchema } from "@/validations/blogSchema";
import { publicProcedure, router, protectedProcedure } from "../init";

const blogRouter = router({
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
    .input(blogCreateSchema)
    .mutation(({ input }) => createBlog(input)),

  update: protectedProcedure
    .input(blogUpdateSchema)
    .mutation(({ input }) => updateBlog(input)),
  delete: protectedProcedure
    .input(blogDeleteSchema)
    .mutation(({ input }) => deleteBlog(input)),
  getAllBlogs: publicProcedure
    .input(z.object({
      search: z.string().optional(),
    }))
    .query(({ input }) => {
      const { search } = input;
      return getAllBlogsWithoutPagination(search ?? '');
    }),
});

export default blogRouter;

export type BlogRouter = typeof blogRouter;
