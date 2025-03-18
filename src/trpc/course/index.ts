import { z } from "zod";
import {
  createCourse,
  updateCourse,
  deleteCourseById,
  getAllCourses,
} from "./controller";
import { publicProcedure, router, protectedProcedure } from "../init";
import {
  createCourseSchema,
  getSectionsSchema,
  updateCourseSchema,
} from "@/validations/courseSchema";
import { getSectionsByCourseId } from '../controllers/userCourse';

const deleteSchema = z.string();

const courseRouter = router({
  get: publicProcedure.query(() => getAllCourses()),
  create: publicProcedure
    .input(createCourseSchema)
    .mutation(({ input }) => createCourse(input)),

  update: protectedProcedure
    .input(updateCourseSchema)
    .mutation(({ input }) => updateCourse(input)),

  delete: protectedProcedure
    .input(deleteSchema)
    .mutation(({ input }) => deleteCourseById(input)),
  getSectionsByCourseId: protectedProcedure
    .input(getSectionsSchema)
    .query(({ input }) => getSectionsByCourseId(input.courseId)),
});

export default courseRouter;

export type CourseRouter = typeof courseRouter;
