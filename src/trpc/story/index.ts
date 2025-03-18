import { getStories, getStoryById } from "@/queries/story/getStories";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../init";
import { createStory, updateStory } from "./controller";
import { getStorySchema, deleteStorySchema } from "@/validations/storySchema";
import { deleteStory } from "./controller";

const storyRouter = router({
  get: publicProcedure
    .input(getStorySchema)
    .query(({ input }) => getStories(input)),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ input }) => {
      const { id } = input;
      return getStoryById(id);
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        image: z.string(),
        role: z.string().min(3),
        status: z.string().min(3),
      })
    )
    .mutation(async ({ input }) => {
      const { name, image, role, status } = input;
      return createStory({ name, image, role, status });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().min(3),
        name: z.string().min(3),
        image: z.string(),
        role: z.string().min(3),
        status: z.string().min(3),
      })
    )
    .mutation(async ({ input }) => {
      const { id, name, image, role, status } = input;
      return updateStory(id, { name, image, role, status });
    }),
  
  delete: protectedProcedure
    .input(deleteStorySchema)
    .mutation(({ input }) => deleteStory(input)),
});

export default storyRouter;

export type StoryRouter = typeof storyRouter;
