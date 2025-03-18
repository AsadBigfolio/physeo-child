import { addOTP, addOTPUsingEmail, verifyOtp, verifyOtpUsingEmail } from "./controller";
import { z } from "zod";
import { publicProcedure, router } from "../init";

const OtpRouter = router({
  addOtp: publicProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
        otp: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => addOTP(input)),

  verifyOtp: publicProcedure
    .input(
      z.object({
        userId: z.string().nonempty(),
        otp: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => verifyOtp(input)),
  addOTPUsingEmail: publicProcedure
    .input(
      z.object({
        email: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => addOTPUsingEmail(input)),
  verifyOtpUsingEmail: publicProcedure
    .input(
      z.object({
        email: z.string().nonempty(),
        otp: z.string().nonempty(),
      })
    )
    .mutation(({ input }) => verifyOtpUsingEmail(input)),
});

export default OtpRouter;
