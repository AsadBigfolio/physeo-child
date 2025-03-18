import { createTestimonial, deleteTestimonial, updateTestimonial } from "./controller";
import { testimonialCreateSchema, testimonialUpdateSchema, testimonialDeleteSchema } from "@/validations/testimonialSchema";
import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

const testimonialRouter = router({
    create: publicProcedure
        .input(testimonialCreateSchema)
        .mutation(({ input }) => createTestimonial(input)),

    update: publicProcedure
        .input(testimonialUpdateSchema)
        .mutation(({ input }) => updateTestimonial(input)),

    delete: publicProcedure
        .input(testimonialDeleteSchema)
        .mutation(({ input }) => deleteTestimonial(input)),
});

export default testimonialRouter;

export type TestimonialRouter = typeof testimonialRouter;
