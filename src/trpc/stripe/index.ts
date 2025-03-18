import { z } from "zod";
import { initTRPC } from "@trpc/server";
import { createOrder, createPaymentIntent, processReferralDiscount } from "./controller";

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

const stripeRouter = router({
  createPaymentIntent: publicProcedure
    .input(
      z.object({
        amount: z.string(),
        userName: z.string().optional(),
        plan: z.string(),
      })
    )
    .mutation(async ({ input }) => createPaymentIntent(input)),
  createOrder: publicProcedure
    .input(
      z.object({
        plan: z.string(),
        courses: z.array(z.string()).optional(),
        paymentMethod: z.string(),
        paymentId: z.string(),
        userId: z.string().optional()
      })
    )
    .mutation(({ input }) => createOrder(input)),
  processReferralDiscount: publicProcedure
    .input(
      z.object({
        plan: z.string(),
        amount: z.string(),
        userName: z.string()
      })
    )
    .mutation(({ input }) => processReferralDiscount(input.userName, input.plan, input.amount)),
});

export default stripeRouter;

export type StripeRouter = typeof stripeRouter;
