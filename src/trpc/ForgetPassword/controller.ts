import { User } from "@/models";
import { NodeMailerTransporter } from "@/utils/nodeMailer";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";

export const sendResetLink = async (input) => {
  const { email } = input;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(
        JSON.stringify([
          {
            message: "User not found.",
            path: ["user"],
          },
        ])
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const tokenExpiration = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(tokenExpiration);
    await user.save();

    const resetLink = `${
      process.env.FRONTEND_URL
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Super U Reset Password Link",
      text: `Your Reset Link is: ${resetLink}`,
    };

    await NodeMailerTransporter.sendMail(mailOptions);

    return;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const resetPassword = async (input) => {
  const { email, token, password } = input;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: JSON.stringify([
          {
            message: "User not found.",
            path: ["user"],
          },
        ]),
      });
    }

    const currentTime = Date.now();
    const tokenIsValid = user.resetPasswordToken === token;
    const expiryIsValid =
      user.resetPasswordExpires &&
      new Date(user.resetPasswordExpires).getTime() > currentTime;

    if (!tokenIsValid || !expiryIsValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: JSON.stringify([
          {
            message: "Invalid or expired token.",
            path: ["user"],
          },
        ]),
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};
