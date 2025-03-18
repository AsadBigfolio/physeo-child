import { TRPCError } from "@trpc/server";
import { OTP } from "@/models";
import { User } from "@/models";
import { NodeMailerTransporter } from "@/utils/nodeMailer";

export const verifyOtp = async (input) => {
  const { otp, userId } = input;

  try {
    const otpDoc = await OTP.findOne({ userId });

    if (!otpDoc) {
      throw new Error(
        JSON.stringify([
          {
            message: "No OTP Found. Please resend the OTP.",
            path: ["otp"],
          },
        ])
      );
    }

    const lastOtp = otpDoc.otp[otpDoc.otp.length - 1];

    if (lastOtp !== otp) {
      throw new Error(
        JSON.stringify([
          {
            message: "Invalid OTP. Please try again.",
            path: ["otp"],
          },
        ])
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isEmailVerified: true },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error(
        JSON.stringify([
          {
            message: "User not found.",
            path: ["otp"],
          },
        ])
      );
    }

    return { success: true, message: "OTP verified successfully." };
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const addOTP = async (input) => {
  const { otp, userId } = input;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error(
        JSON.stringify([
          {
            message: "User not found.",
            path: ["otp"],
          },
        ])
      );
    }

    const newOtp = await OTP.findOneAndUpdate(
      { userId },
      { $push: { otp }, userId },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    await NodeMailerTransporter.sendMail(mailOptions);

    return newOtp;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};
export const addOTPUsingEmail = async (input) => {
  const { email } = input;
  const safeOtp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    const otpDoc = await User.findOne({ email });

    if (otpDoc) {
      throw new Error(
        JSON.stringify([
          {
            message: "Email already register.please use another.",
            path: ["otp"],
          },
        ])
      );
    }
    const newOtp = await OTP.findOneAndUpdate(
      { email },
      { $push: { otp: safeOtp }, email },
      { upsert: true, new: true }
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${safeOtp}`,
    };

    await NodeMailerTransporter.sendMail(mailOptions);

    return newOtp;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const verifyOtpUsingEmail = async (input) => {
  const { otp, email } = input;

  try {
    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      throw new Error(
        JSON.stringify([
          {
            message: "No OTP Found. Please resend the OTP.",
            path: ["otp"],
          },
        ])
      );
    }

    const lastOtp = otpDoc.otp[otpDoc.otp.length - 1];

    if (lastOtp !== otp) {
      throw new Error(
        JSON.stringify([
          {
            message: "Invalid OTP. Please try again.",
            path: ["otp"],
          },
        ])
      );
    }

    return { success: true, message: "OTP verified successfully." };
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};
