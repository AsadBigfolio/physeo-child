import { Badge, Course, Quiz, Section, User, Video, WatchLater } from "@/models";
import { WatchHistory } from "@/models";
import { Types } from "mongoose";

export const createWatchLater = async (input) => {
  try {
    const watchLater = await WatchLater.create(input);

    return watchLater;
  } catch (error) {
    console.error("Error creating WatchLater document:", error.message);
  }
};

export const deleteWatchLater = async (input) => {
  try {
    const { user, video } = input;

    const result = await WatchLater.findOneAndDelete({
      user: user,
      video: video,
    });
    if (!result) {
      throw new Error("Document not found");
    }

    return result;
  } catch (error) {
    console.error("Error deleting WatchLater document:", error);
    throw error;
  }
};

export const createOrUpdateWatchHistory = async (input) => {
  try {

    const { user, video, progress, totalLength } = input;
    let dbVideo = await Video.findById(video);
    let watchHistory = await WatchHistory.findOne({ user, video });
    if (watchHistory) {
      if (watchHistory.progress < progress) {
        watchHistory.progress = progress;
        watchHistory.totalLength = totalLength;
      }
      await watchHistory.save();
    } else {
      watchHistory = await WatchHistory.create({
        ...input,
        section: dbVideo?._id,
      });
    }
    // Check if all videos in the section have been fully watched
    const videosInSection = await Video.find({
      section: dbVideo?.section?._id,
    });

    const allVideosWatched = await Promise.all(
      videosInSection.map(async (vid) => {
        const history = await WatchHistory.findOne({
          user,
          video: vid._id,
        });
        return history && history.progress === history.totalLength && history.progress > 0;
      })
    );

    const allQuizes = await Quiz.find({
      section: dbVideo?.section?._id,
    }).countDocuments();
    const userDetail = await User.findById(user);
    const isAllQuizzesAttempted = userDetail?.attemptQuiz.length === allQuizes;

    if (allVideosWatched.every(Boolean)) {
      const badge = await Badge.findOne({ section: dbVideo?.section?._id }).populate({ path: 'image', select: 'src' });
      console.log('Assign badge ===========>')
      const isBadgeAwarded = userDetail?.badges.some(
        (b) => b.badge?.toString() === badge?._id.toString()
      );
      if (badge && !isBadgeAwarded) {
        // Add badge to user
        await User.findByIdAndUpdate(user, {
          $addToSet: { badges: { badge: badge._id } }, // Ensure no duplicate badges
        });
        return { badge }
      }
    }

    return watchHistory;
  } catch (error) {
    console.error(
      "Error creating or updating WatchHistory document:",
      error.message
    );
    throw error;
  }
};

export const deleteWatchHistory = async (input) => {
  try {
    const { user, video } = input;
    const result = await WatchHistory.findOneAndDelete({ user, video });

    if (!result) {
      throw new Error("Document not found");
    }

    return result;
  } catch (error) {
    console.error("Error deleting WatchHistory document:", error);
    throw error;
  }
};

export const getSectionsByCourseId = async (courseId: string) => {
  try {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }

    const sections = await Section.find({ courseId });

    return sections.length ? sections : [];
  } catch (error) {
    console.error(`Error fetching sections for courseId ${courseId}:`, error);
    return [];
  }
};


export const checkSectionCompletion = async (input: { userId: string, sectionId: string }) => {
  try {
    const { userId, sectionId } = input;
    const user = await User.findById(userId);
    const badge = await Badge.findOne({ section: sectionId }).populate({ path: 'image', select: 'src' })
    const isBadgeAwarded = user?.badges.some(
      (b) => b.badge?.toString() === badge?._id.toString()
    );
    if (isBadgeAwarded) {
      return { completed: false, badge: null };
    }
    const videosInSection = await Video.find({ section: sectionId });
    const allVideosWatched = await Promise.all(
      videosInSection.map(async (video) => {
        const watchHistory = await WatchHistory.findOne({ user: userId, video: video._id });
        return watchHistory && watchHistory.progress === watchHistory.totalLength && watchHistory.progress > 0;
      })
    );
    if (!allVideosWatched.every(Boolean)) {
      return { completed: false, badge: null };
    }
    const totalSectionRelatedQuizzes = await Quiz.find({ section: sectionId });
    const attemptedQuizzes = user?.attemptQuiz || [];
    const attemptedQuizIds = attemptedQuizzes.map((quiz) => quiz.toString());
    const isAllQuizzesAttempted = totalSectionRelatedQuizzes.every(quiz =>
      attemptedQuizIds.includes(quiz._id.toString())
    );
    if (!isAllQuizzesAttempted) {
      return { completed: false, badge: null };
    }
    return { completed: true, badge };

  } catch (error) {
    console.error("Error checking section completion:", error.message);
    throw error;
  }
};
