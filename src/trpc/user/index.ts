import { protectedProcedure, publicProcedure, router } from "../init";
import {
  deleteUserSchema,
  registerSchema,
  updateUserSchema,
  getUserByIdSchema,
  editProfileSchema,
  updateProfileImageSchema,
  updateQuizAttemptSchema,
  updateCertificateSchema,
  createUserSchema,
  checkUserNameSchema
} from "@/validations/userSchema";
import {
  deleteUserById,
  getUserById,
  registerUser,
  updateUser,
  editProfile,
  updateImage,
  updateUserCertificates,
  createUser,
  userNameAlreadyExists
} from "./controller";
import { attemptQuizHandler } from '@/utils/badgeAward';

const userRouter = router({
  get: protectedProcedure
    .input(getUserByIdSchema)
    .query(({ input }) => getUserById(input)),

  register: publicProcedure
    .input(registerSchema)
    .mutation(({ input }) => registerUser(input)),

  editProfile: protectedProcedure
    .input(editProfileSchema)
    .mutation(({ input }) => editProfile(input)),

  deleteStudent: publicProcedure
    .input(deleteUserSchema)
    .mutation(({ input }) => deleteUserById(input)),

  updateStudent: publicProcedure
    .input(updateUserSchema)
    .mutation(({ input }) => updateUser(input)),
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => createUser(input)),

  updateProfileImage: protectedProcedure
    .input(updateProfileImageSchema)
    .mutation(({ input }) => updateImage(input)),
  updateQuizAttempt: protectedProcedure
    .input(updateQuizAttemptSchema)
    .mutation(({ input }) => attemptQuizHandler(input)),
  updateUserCertificates: protectedProcedure
    .input(updateCertificateSchema)
    .mutation(({ input }) => updateUserCertificates(input)),
  userNameAlreadyExists: publicProcedure
    .input(checkUserNameSchema)
    .mutation(({ input }) => userNameAlreadyExists(input)),
});

export default userRouter;

export type UserRouter = typeof userRouter;
