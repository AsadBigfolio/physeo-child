import { WatchLater, WatchHistory } from "@/models";

export const getAllWatchLaters = async (input: {
  user: string;
  course?: string;
}) => {
  const { user, course } = input;

  const query: { user: string; course?: string } = { user };

  if (course) {
    query.course = course;
  }

  try {
    const watchLaters = await WatchLater.find(query)
      .populate("video")
      .populate({
        path: "course",
        select: "title slug",
      });

    if (!watchLaters.length) {
      return []
    }

    const filteredWatchLaters = watchLaters.filter(
      (watchLater) => !!watchLater.course
    );
    return filteredWatchLaters;
  } catch (error) {
    console.error("Error retrieving Watch Later documents:", error.message);
    throw error;
  }
};

export const getAllWatchHistories = async (input) => {
  const { user } = input;
  try {
    const watchHistories = await WatchHistory.find({ user })
      .populate("video")
      .populate({
        path: "course",
        select: "title slug",
      });

    if (!watchHistories) {
      return []
    }

    const filteredWatchHistories = watchHistories.filter(
      (watchHistory) => !!watchHistory.course
    );

    return filteredWatchHistories;
  } catch (error) {
    console.error("Error retrieving Watch History documents:", error.message);
    throw error;
  }
};
