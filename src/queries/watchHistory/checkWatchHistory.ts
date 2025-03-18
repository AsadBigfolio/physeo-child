import { Badge, Course, Quiz, User, Video, WatchHistory } from '@/models';
import { Types } from 'mongoose';
function capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
}
const assignCourseBaseBadge = async (courseId: any, userId: any,) => {
    const course = await Course.findById(courseId)
    if (!course) return
    const badge = await Badge.findOne({ title: capitalize(course.title) })
    if (!badge) return
    const user = await User.findById(userId).populate("badges.badge");
    if (!user) return
    const alreadyAwarded = user.badges.find(
        (b) => b.badge?._id.toString() === badge._id.toString()
    );
    if (alreadyAwarded) return
    user.badges.push({ badge: badge._id, dateAwarded: new Date() });
    await user.save();
}


export const checkCourseComplete = async (courseId: string, user: string) => {

    try {
        const userIdObject = new Types.ObjectId(user);
        const videosExistInHistory = await WatchHistory.find({
            user: userIdObject,
            course: courseId,
            progress: { $gt: 0 }
        });
        const courseAssociatedVideos = await Video.find({ course: courseId });
        const userDetail = await User.findById(userIdObject);
        const totalCourseRelatedQuizzes = await Quiz.find({ course: courseId });
        const isAllVideosWatched = videosExistInHistory.length === courseAssociatedVideos.length;
        const attemptedQuizzes = userDetail?.attemptQuiz || [];

        const attemptedQuizIds = attemptedQuizzes.map((quiz) => quiz.toString());
        const isAllQuizzesAttempted = totalCourseRelatedQuizzes.every(quiz =>
            attemptedQuizIds.includes(quiz._id.toString())
        );
        if (isAllVideosWatched && isAllQuizzesAttempted) {
            assignCourseBaseBadge(courseId, userIdObject)

        }
        return isAllVideosWatched && isAllQuizzesAttempted;

    } catch (error) {
        console.error('Error checking course completion:', error.message);
        throw error;
    }
};
