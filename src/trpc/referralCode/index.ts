import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { createReferralCode } from './controller';

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

const referralRouter = router({
  createReferralCode: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => createReferralCode(input.userId)),
});

export default referralRouter;

export type ReferralRouter = typeof referralRouter;
