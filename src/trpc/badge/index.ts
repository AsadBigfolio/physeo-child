import {
  getAwardedBadges,
  getBadgeById,
  getBadges,
} from "@/queries/badge/getBadges";
import {
  badgeAwardedSchema,
  badgeCreateSchema,
  badgeDeleteSchema,
  badgeUpdateSchema,
} from "@/validations/badgeSchema";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { createBadge, deleteBadge, updateBadge } from "./controller";
import badgeAssignHandler from '@/utils/badgeAward';

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

const badgeRouter = router({
  get: publicProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(10),
        searchQuery: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const { page, pageSize, searchQuery } = input;
      return getBadges(page, pageSize, searchQuery);
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      const { id } = input;
      return getBadgeById(id);
    }),

  create: publicProcedure
    .input(badgeCreateSchema)
    .mutation(({ input }) => createBadge(input)),

  update: publicProcedure
    .input(badgeUpdateSchema)
    .mutation(({ input }) => updateBadge(input)),

  getAwardedBadges: publicProcedure
    .input(badgeAwardedSchema)
    .query(async ({ input }) => getAwardedBadges(input)),
  delete: publicProcedure
    .input(badgeDeleteSchema)
    .mutation(({ input }) => deleteBadge(input)),
  badgeAssignment: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        isLogin: z.boolean()
      })
    )
    .mutation(async ({ input }) => {
      const { userId, isLogin } = input;
      const res = await badgeAssignHandler(userId, isLogin);
      return res;
    }),
});


export default badgeRouter;

export type BadgeRouter = typeof badgeRouter;
