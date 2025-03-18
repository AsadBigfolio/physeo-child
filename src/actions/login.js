import { getSession, signIn } from "next-auth/react";
import { z } from "zod";

const login = async (prev, formData, afterRegister = false) => {
  try {
    const email = !afterRegister ? formData?.get("email") : formData?.email;
    const password = !afterRegister ? formData?.get("password") : formData?.password;

    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const result = schema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      return {
        validationErrors: result.error.errors.map((error) => {
          return {
            field: error.path.join("."),
            message: error.message.replace(/String/g, " "),
          };
        }),
      };
    }
    const { ok, error } = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!ok) {
      return {
        error: "Wrong credentials",
      };
    }
    const session = await getSession();
    return { ok, error, user: session?.user };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};

export default login;
