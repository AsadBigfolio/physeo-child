import { z } from "zod";
const genericPhoneRegex = /^[0-9()+\-\s]*$/;
const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  userName: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .regex(/^[a-z0-9._-]+$/, { message: "Username can only contain lowercase letters, numbers, hyphens, dots, and underscores" })
    .transform((val) => val.trim()),
  phoneNumber: z
    .string()
    .regex(genericPhoneRegex, "Invalid phone number.")
    .optional(),
  houseOfLight: z.string().optional(),
  address: z.string().optional(),
  about: z.string().optional(),
  gender: z.string().optional(),
  _id: z.string().optional(),
  role: z.string().optional(),
  subscribedPlans: z.array(z.string()).optional(),
  courses: z.array(z.string()).optional(),
});
export const createUserSchema = baseUserSchema.extend({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password must be at least 6 characters long" }),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
      path: ["consent"],
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
export const registerSchema = baseUserSchema
  .extend({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm password must be at least 6 characters long",
      }),
    consent: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
      path: ["consent"],
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateUserSchema = baseUserSchema.partial();

export const editProfileSchema = baseUserSchema.extend({
  userId: z.string(),
  image: z.string(),
});

export const updateProfileImageSchema = z.object({
  userId: z.string(),
  image: z.string().optional(),
});
export const updateQuizAttemptSchema = z.object({
  quizId: z.string(),
  userId: z.string(),
});

export const updateCertificateSchema = z.object({
  userId: z.string(),
  certificate: z.string()
})

export const checkUserNameSchema = z.object({
  userName: z.string()
})

export const deleteUserSchema = z.object({ _id: z.string() });

export const getUserByIdSchema = z.object({ _id: z.string() });

export type RegisterType = z.infer<typeof registerSchema>;
export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type DeleteUserType = z.infer<typeof deleteUserSchema>;
export type GetUserByIdType = z.infer<typeof getUserByIdSchema>;
export type updateQuizAttemptType = z.infer<typeof updateQuizAttemptSchema>;
export type updateCertificateType = z.infer<typeof updateCertificateSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
export type checkUserNameType = z.infer<typeof checkUserNameSchema>
export type updateProfileImageType = z.infer<typeof updateProfileImageSchema>