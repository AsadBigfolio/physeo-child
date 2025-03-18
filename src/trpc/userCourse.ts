import { z } from "zod";
import {
  createWatchLater,
  deleteWatchLater,
  createOrUpdateWatchHistory,
  deleteWatchHistory,
  checkSectionCompletion,
} from "./controllers/userCourse";
import { getAllWatchLaters } from "@/queries/user/getUserCourseData";
import { publicProcedure, router } from "./init";
import { checkCourseComplete } from "@/queries/watchHistory/checkWatchHistory";
import { Types } from "mongoose";

const baseSchema = z.object({
  user: z.string().min(1),
  course: z.string().optional(),
});

const checkSectionCompletionSchema = z.object({
  userId: z.string().min(1),
  sectionId: z.string(),
});

const watchLaterSchema = baseSchema.extend({
  section: z.string().min(1),
  video: z.string().min(1),
});

const watchHistorySchema = baseSchema.extend({
  progress: z.number(),
  totalLength: z.number(),
  video: z.string().min(1),
});
const objectIdValidator = z
  .string()
  .refine((value) => Types.ObjectId.isValid(value), {
    message: "Invalid ObjectId",
  });
const videoIdsSchema = z.object({
  courseId: z.string(),
  user: z.string(),
});
const userCourseRouter = router({
  createWatchLater: publicProcedure
    .input(watchLaterSchema)
    .mutation(({ input }) => createWatchLater(input)),

  deleteWatchLater: publicProcedure
    .input(watchLaterSchema)
    .mutation(({ input }) => deleteWatchLater(input)),

  createOrUpdateWatchHistory: publicProcedure
    .input(watchHistorySchema)
    .mutation(({ input }) => {
      return createOrUpdateWatchHistory(input);
    }),
  checkSectionCompletion: publicProcedure
    .input(checkSectionCompletionSchema)
    .mutation(({ input }) => {
      return checkSectionCompletion(input);
    }),
  deleteWatchHistory: publicProcedure
    .input(baseSchema)
    .mutation(({ input }) => deleteWatchHistory(input)),

  getWatchLater: publicProcedure
    .input(baseSchema)
    .query(({ input }) => getAllWatchLaters(input)),
  checkCourseComplete: publicProcedure
    .input(videoIdsSchema)
    .mutation(({ input }) => checkCourseComplete(input.courseId, input.user)),
});

export default userCourseRouter;

export type FileRouter = typeof userCourseRouter;
