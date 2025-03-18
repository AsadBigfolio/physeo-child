import { getPlans } from "@/queries/plan/getPlans";
import loadSession from "@/utils/session";
import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

const testimonialRouter = router({
  get: publicProcedure.query(async () => {
    const session = await loadSession();

    // const plans = await getPlans();
    // console.log("Plans:", plans); // Log the output
    return getPlans();
  }),
});

export default testimonialRouter;

export type TestimonialRouter = typeof testimonialRouter;
