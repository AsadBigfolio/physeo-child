import { z } from "zod";

const optionSchema = z.object({
  option: z.string().min(1, "Option is required"),
});

const mcqSchema = z.object({
  title: z.string().min(1, "Question title is required"),
  options: z.array(optionSchema).min(2, "At least two options are required"),
  correctOption: z.number({ message: "Correct option is required" }),
  explanation: z.string().optional(),
});

export const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  mcqs: z.array(mcqSchema).nonempty("At least one question is required"),
  _id: z.string().optional(),
});
