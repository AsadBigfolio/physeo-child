"use server";

import { User } from "@/models";
import { z } from "zod";

const schema = z
  .object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    userName: z.string().min(2),
    phoneNumber: z.string().optional(),
    houseOfLight: z.string().optional(),
    address: z.string().optional(),
    about: z.string().optional(),
    gender: z.string().optional(),
    userId: z.string(),
    image: z.string(),
  })
  .strict();

const editProfile = async (prev, formData) => {
  const user = {};

  formData.forEach((value, key) => {
    user[key] = value;
  });

  try {
    const result = schema.safeParse(user);

    if (!result.success) {
      return {
        validationErrors: result.error.errors.map((error) => ({
          field: error.path.join("."),
          message: error.message.replace(/String/g, " "),
        })),
      };
    }

    const existingUser = await User.findById(user.userId);

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      { $set: user },
      { new: true }
    );

    const { password, ...userWithoutPassword } = updatedUser._doc;

    return {
      error: null,
      message: "Profile update successful",
      user: userWithoutPassword,
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      error: err.message,
    };
  }
};

export default editProfile;
