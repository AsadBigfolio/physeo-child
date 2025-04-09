import { User } from "@/models";
import { WatchHistory } from "@/models";
import { WatchLater } from "@/models";
import { populate } from 'dotenv';

export const getUserProfileData = async (user) => {
  const { id, email } = user;
  try {
    const user = await User.findOne({ email })
      .select(
        "-password -history -deletedAt -updatedAt -provider"
      )
      .populate({
        path: "badges.badge",
        select: "title description status image course",
        populate: {
          path: "image",
          model: "File",
          select: "src",
        },
      })
      .populate({
        path: "subscribedPlans",
      });

    if (!user) {
      throw new Error("User not found");
    }

    let watchHistories = await WatchHistory.find({ user: user._id })
      .populate({
        path: "video",
        populate: {
          path: "thumbnail",
          select: "src duration",
        },
      })
      .populate({
        path: "course",
        select: "title slug",
      });

    let watchLaters = await WatchLater.find({ user: user._id })
      .populate({
        path: "video",
        populate: {
          path: "thumbnail",
          select: "src",
        },
      })
      .populate({
        path: "course",
        select: "title slug",
      });

    if (!watchLaters.length) {
      watchHistories = [];
    }

    if (!watchHistories) {
      watchHistories = [];
    }
    return { user, watchHistories, watchLaters };
  } catch (error) {
    console.log("error", error)
  }
};
