import {User} from "@/models";
import { populate } from 'dotenv';

export const getUsers = async (limit, page, search) => {
  try {
    const query = search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { userName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          { phoneNumber: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);
    const users = await User.find(query)
      .select("-password")
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("image", "src")
      .populate({
        path: "subscribedPlans",
        populate: {
          path: "plan",
          select: 'title'
        },
      });

    return JSON.stringify({ users, totalPages, totalUsers });
  } catch (error) {
    console.error("Error fetching Users:", error.message);
    throw error;
  }
};
