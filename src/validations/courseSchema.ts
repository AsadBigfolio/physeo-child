import { z } from "zod";
import { quizSchema } from "./QuizSchema";

export const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  videoUrl: z.string().url("Invalid video URL"),
  audioUrl: z.string().url("Invalid audio URL").or(z.literal("")).optional(),
  pdfUrl: z.string().url("Invalid PDF URL").or(z.literal("")).optional(),
  mnemonicsDesktop: z.string().url("Invalid Mnemonics Desktop URL").or(z.literal("")).optional(),
  mnemonicsMobile: z.string().url("Invalid Mnemonics Mobile URL").or(z.literal("")).optional(),
  thumbnail: z
    .object({
      src: z.string().url("Invalid thumbnail URL"),
      _id: z.string(),
    })
    .optional(),
  isTrial: z.boolean().optional(),
  topics: z.array(z.string()).optional(),
  quiz: quizSchema.optional(),
});

export const sectionSchema = z.object({
  title: z.string().min(2),
  videos: z.array(videoSchema),
  flashCardLink: z.string().url("Invalid flash card URL."),
})

export const createCourseSchema = z.object({
  title: z.string().min(2, "Title is too short"),
  description: z.string().optional(),
  status: z.enum(["draft", "published"]),
  tags: z.array(z.string()).optional(),
  image: z.object({ _id: z.string() }),
  slug: z.string().min(1, "Slug is too short"),
  sections: z.array(
    sectionSchema
  ),
  category: z.string()
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
