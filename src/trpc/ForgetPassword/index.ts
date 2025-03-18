import { z } from "zod";
import { publicProcedure, router } from "../init";
import { sendResetLink, resetPassword } from "./controller";

const ForgetPasswordRouter = router({
  sendResetLink: publicProcedure
    .input(
      z.object({
        email: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => sendResetLink(input)),

  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().nonempty(),
        token: z.string().nonempty(),
        password: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => resetPassword(input)),
});

export default ForgetPasswordRouter;
