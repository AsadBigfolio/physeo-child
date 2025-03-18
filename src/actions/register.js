"use server";

import { User } from "@/models";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
  phone: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const register = async (prev, formData) => {
  const user = {};

  formData.forEach((value, key) => {
    user[key] = value;
  });

  try {
    const result = schema.safeParse(user);

    if (!result.success) {
      return {
        errors: result.error.errors.map((error) => {
          return {
            field: error.path.join("."),
            message: error.message.replace(/String/g, " "),
          };
        }),
      };
    }

    const alreadyExists = await User.findOne({ email: user.email });

    if (alreadyExists) {
      return {
        errors: [
          {
            field: "email",
            message: "Email already exists",
          },
        ],
      };
    }

    if (user.password !== user.confirmPassword) {
      return {
        errors: [
          {
            field: "confirmPassword",
            message: "Password does not match",
          },
        ],
      };
    }

    const newUser = await User.create(user);
    delete newUser._doc.password;

    return {
      errors: null,
      message: "Register Successful",
      user: newUser._doc,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};

export default register;
