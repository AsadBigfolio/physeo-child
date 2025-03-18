import {User} from "@/models";

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id).select('-password -history -deletedAt -createdAt -updatedAt -provider').populate({
      path: "subscribedPlans",
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
