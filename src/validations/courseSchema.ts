import { z } from "zod";
import { quizSchema } from "./QuizSchema";

export const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL"),
  thumbnail: z
    .object({
      src: z.string().url("Invalid URL"),
      _id: z.string(),
    })
    .optional(),
  isTrial: z.boolean().optional()
});

export const createCourseSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().optional(),
  status: z.enum(["draft", "published"]),
  tags: z.array(z.string()).optional(),
  image: z.object({ _id: z.string() }),
  slug: z.string().min(1, "Slug is too short"),
  sections: z.array(
    z.object({
      title: z.string().min(2),
      videos: z.array(videoSchema),
      quiz: quizSchema.optional(),
    })
  ),
});

export const updateCourseSchema = createCourseSchema.extend({
  _id: z.string(),
  sections: z.array(
    createCourseSchema.shape.sections.element.extend({
      videos: z.array(
        videoSchema.extend({
          _id: z.string().optional(),
        })
      ),
      _id: z.string().optional(),
    })
  ),
});

export const getSectionsSchema = z.object({
  courseId: z.string(),
})

export type CreateCourseType = z.infer<typeof createCourseSchema>;
export type UpdateCourseType = z.infer<typeof updateCourseSchema>;
export type getSectionsType = z.infer<typeof getSectionsSchema>;
