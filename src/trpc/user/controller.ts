import { User } from "@/models";
import badgeAssignHandler from '@/utils/badgeAward';
import {
  RegisterType,
  UpdateUserType,
  DeleteUserType,
  GetUserByIdType,
  updateCertificateType,
  CreateUserType,
  checkUserNameType,
  updateProfileImageType,
} from "@/validations/userSchema";
import { TRPCError } from "@trpc/server";
import { createOrder } from '../stripe/controller';

export const registerUser = async (user: RegisterType) => {
  const { email, userName } = user;

  try {
    const alreadyExists = await User.findOne({ email: email });
    const userNameAlreadyExists = await User.findOne({ userName });
    if (alreadyExists) {
      throw new Error(
        JSON.stringify([
          {
            message: "Email not available",
            path: ["email"],
          },
        ])
      );
    }
    if (userNameAlreadyExists) {
      throw new Error(
        JSON.stringify([
          {
            message: "UserName not available.",
            path: ["userName"],
          },
        ])
      );
    }

    const newUser = await User.create(user);
    delete newUser.password;

    return {
      errors: null,
      message: "Register Successful",
      user: newUser,
    };
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const deleteUserById = async ({ _id: studentId }: DeleteUserType) => {
  try {
    if (!studentId) {
      throw new Error("Student ID is required");
    }

    const result = await User.deleteOne({ _id: studentId });

    if (result.deletedCount === 0) {
      throw new Error("Student not found");
    }

    return { success: true, message: "Student deleted successfully" };
  } catch (error) {
    console.error("Error Deleting Student:", error.message);
    return { success: false, message: error.message };
  }
};

export const updateUser = async (updatedStudentData: UpdateUserType) => {
  const { _id, userName, courses, subscribedPlans } = updatedStudentData;
  const userId = _id;
  let studentData = { ...updatedStudentData }
  delete studentData.subscribedPlans
  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      throw new Error(
        JSON.stringify([
          {
            message: "User not found",
            path: ["firstName"],
          },
        ])
      );
    }

    const existingUserWithUsername = await User.findOne({ userName });
    if (
      existingUserWithUsername &&
      existingUserWithUsername._id.toString() !== userId
    ) {
      throw new Error(
        JSON.stringify([
          {
            message: "Username not available",
            path: ["userName"],
          },
        ])
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: studentData },
      { new: true }
    );
    await createOrder({
      plan: subscribedPlans?.length ? subscribedPlans[0] : '',
      courses: courses,
      paymentMethod: 'Manual',
      paymentId: '',
      userId
    })
    await badgeAssignHandler(userId as string, false)
    const { password, ...userWithoutPassword } = updatedUser || {};

    return {
      error: null,
      message: "Profile update successful",
      user: userWithoutPassword,
      success: true,
    };
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const getUserById = async (id: GetUserByIdType) => {
  try {
    const user = await User.findById(id).populate({
      path: "subscribedPlans",
      populate: [
        { path: "plan", select: "title price" },
        { path: "course", select: "title slug" },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editProfile = async (user) => {
  try {
    const existingUser = await User.findById(user.userId);

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }
    const existingUserWithUsername = await User.findOne({ userName: user.userName });
    if (
      existingUserWithUsername &&
      existingUserWithUsername._id.toString() !== user.userId
    ) {
      throw new Error(
        JSON.stringify([
          {
            message: "Username not available",
            path: ["userName"],
          },
        ])
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      { $set: user },
      { new: true }
    );

    const { password, ...userWithoutPassword } = updatedUser || {};
    await badgeAssignHandler(user.userId, false)
    return {
      error: null,
      message: "Profile update successful",
      user: userWithoutPassword,
      success: true,
    };
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const updateImage = async ({ userId, image }: updateProfileImageType) => {
  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { image } },
      { new: true }
    );
    await badgeAssignHandler(userId, false)
    const { password, ...userWithoutPassword } = updatedUser || {};

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


export const updateUserCertificates = async (input: updateCertificateType) => {
  const { userId, certificate } = input;
  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return {
        error: "User not found",
      };
    }

    const normalizedCertificate = certificate.trim().toLocaleLowerCase();

    const hasNewCertificate = existingUser.certificates.some(
      (item: string) => item.trim().toLocaleLowerCase() === normalizedCertificate
    );

    if (hasNewCertificate) {
      return {
        message: "Certificate already exists",
      };
    }

    existingUser.certificates.push(certificate.trim());

    await existingUser.save();

    return {
      message: "Certificate added successfully",
      user: existingUser,
    };
  } catch (err: any) {
    console.error(err);
    return {
      error: err.message,
    };
  }
};


export const createUser = async (newUserData: CreateUserType) => {
  const { userName, email } = newUserData;

  try {
    const existingUserWithUsername = await User.findOne({ userName });
    if (existingUserWithUsername) {
      throw new Error(
        JSON.stringify([
          {
            message: "Username not available",
            path: ["userName"],
          },
        ])
      );
    }

    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      throw new Error(
        JSON.stringify([
          {
            message: "Email already registered",
            path: ["email"],
          },
        ])
      );
    }

    const newUser = new User(newUserData);
    await newUser.save();

    await badgeAssignHandler(newUser._id as unknown as string, false);

    const { password, ...userWithoutPassword } = newUser.toObject();

    return {
      error: null,
      message: "User created successfully",
      user: userWithoutPassword,
      success: true,
    };
  } catch (err) {
    console.error(err);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};

export const userNameAlreadyExists = async (input: checkUserNameType) => {
  const { userName } = input
  const existingUserWithUsername = await User.findOne({ userName });
  if (existingUserWithUsername) {
    throw new Error(
      JSON.stringify([
        {
          message: "Username not available",
          path: ["userName"],
        },
      ])
    );
  } else {
    return { userName }
  }
}
