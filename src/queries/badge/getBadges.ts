import { Badge, User } from "@/models";
import { BadgeAwardedType } from "@/validations/badgeSchema";

export const getBadges = async (page = 1, pageSize = 10, searchQuery = "") => {
  try {
    const query: any = {};
    const searchParams = new URLSearchParams(searchQuery);
    for (const [key, value] of searchParams.entries()) {
      if (key !== "search") {
        query[key.toLowerCase()] = { $regex: value, $options: "i" };
      } else {
        query.title = { $regex: value, $options: "i" };
      }
    }
    const skip = (page - 1) * pageSize;
    const badges = await Badge.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate(["image", "course"]);

    const totalBadges = await Badge.countDocuments(query);

    if (!badges.length) {
      return { badges: [] };
    }

    return {
      badges,
      totalBadges,
      totalPages: Math.ceil(totalBadges / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBadgeById = async (id: string) => {
  try {
    const badge = await Badge.findById(id).populate(["image", "course"]);
    if (!badge) {
      throw new Error("Badge not found.");
    }
    return badge;
  } catch (error) {
    throw new Error(`Failed to get badge by id: ${error.message}`);
  }
};

export const getAwardedBadges = async ({ userId }: BadgeAwardedType) => {
  try {
    const user = await User.findById(userId)
      .select(
        "-password -history -role -deletedAt -createdAt -updatedAt -provider"
      )
      .populate({
        path: "badges.badge",
        select: "title description status image course",
        populate: {
          path: "image",
          model: "File",
          select: "src",
        },
      });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
