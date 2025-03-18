import {
  User,
  Badge,
  Quiz,
  Course,
  Section,
  Video,
  WatchHistory,
} from "@/models";
import { updateQuizAttemptType } from "@/validations/userSchema";
import mongoose, { Types } from "mongoose";

export async function checkAndAwardBadges(
  userId: Types.ObjectId
): Promise<void> {

  const user = await User.findById(userId).populate("badges.badge");
  if (!user) return;

  const allBadges = await Badge.find();
  const totalQuiz = (await Quiz.countDocuments()) || 0;

  for (const badge of allBadges) {
    const alreadyAwarded = user.badges.find(
      (b) => b.badge?._id.toString() === badge._id.toString()
    );

    if (!alreadyAwarded) {
      const shouldAward = checkBadgeCriteria(badge.title, user, totalQuiz);
      if (shouldAward) {
        user.badges.push({ badge: badge._id, dateAwarded: new Date() });
      }
    }
  }

  await user.save();
}

function checkBadgeCriteria(
  criteria: string,
  user: any,
  totalQuiz: number
): boolean {
  switch (criteria.toLowerCase()) {
    case "first login":
      return user.loginCount >= 1;
    case "10th login":
      return user.loginCount >= 10;
    case "100th login":
      return user.loginCount >= 100;
    case "1 week streak":
      return user.streak >= 7;
    case "house of light":
      return Boolean(user.houseOfLight);
    case "quiz master":
      return user?.attemptQuiz?.length === totalQuiz && totalQuiz > 0;
    case "badge collector":
      return user.badges.length === 6;
    case "profile photo upload":
      return Boolean(user.image);
    default:
      return false;
  }
}


const deleteVideosWithMissingCourses = async () => {
  try {
    // Step 1: Find videos with missing courses using $lookup
    const videosWithMissingCourses = await Video.aggregate([
      {
        $lookup: {
          from: 'courses', // Collection name in MongoDB
          localField: 'course',
          foreignField: '_id',
          as: 'courseDetails',
        },
      },
      {
        $match: {
          courseDetails: { $size: 0 }, // Find videos with no associated course
        },
      },
    ]);
    console.log({ videosWithMissingCourses })
    // Step 2: Extract the _ids of videos to delete
    const videoIdsToDelete = videosWithMissingCourses.map(video =>
      new mongoose.Types.ObjectId(video._id)
    );

    if (videoIdsToDelete.length > 0) {
      // Step 3: Delete videos whose courses are missing
      const result = await Video.deleteMany({ _id: { $in: videoIdsToDelete } });

      console.log(`${result.deletedCount} videos deleted.`);
    } else {
      console.log('No orphaned videos found.');
    }
  } catch (error) {
    console.error('Error deleting orphaned videos:', error);
  }
};




export default async function badgeAssignHandler(
  userId: string,
  isLogin: boolean
): Promise<void> {
  const user = await User.findById(userId);
  if (!user) return;

  if (isLogin) {
    user.loginCount += 1;
    await user.save();
  }

  await checkAndAwardBadges(user._id);
}

export async function attemptQuizHandler(
  input: updateQuizAttemptType
): Promise<{ success: boolean; data?: any; message?: string }> {
  const { quizId, userId } = input;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const hasQuiz = user.attemptQuiz.includes(quizId as any);
    if (!hasQuiz) {
      user.attemptQuiz.push(quizId as any);
    }
    await user.save();

    await checkAndAwardBadges(user._id);

    console.log("I reached here");

    const quiz = await Quiz.findById(quizId);
    const allQuizes = await Quiz.find({
      section: quiz?.section,
    }).countDocuments();
    console.log("allQuizes are", allQuizes);
    const section = await Section.findById(quiz?.section);

    const videosInSection = await Video.find({
      section: section?._id,
    });
    console.log("🚀 ~ videosInSection:", videosInSection);

    const allVideosWatched = await Promise.all(
      videosInSection.map(async (vid) => {
        const history = await WatchHistory.findOne({
          user: userId,
          video: vid._id,
        });
        return history && history.progress === history.totalLength;
      })
    );

    console.log("allVideosWatched", allVideosWatched);

    const isAllQuizzesAttempted = user.attemptQuiz.length === allQuizes;
    console.log("isAllQuizzesAttempted", isAllQuizzesAttempted);

    if (allVideosWatched.every(Boolean) && isAllQuizzesAttempted) {
      const badge = await Badge.findOne({ title: section?.title });
      const badgeAlreadyExists = user.badges.find(
        (b) => b.badge?.toString() === badge?._id.toString()
      );
      if (badge && !badgeAlreadyExists) {
        await User.findByIdAndUpdate(user, {
          $addToSet: { badges: { badge: badge._id, dateAwarded: new Date() } }, // Ensure no duplicate badges
        });
      }
    }

    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while attempting quiz",
    };
  }
}
