import { Video, WatchLater } from '@/models';
import loadSession from '@/utils/session';
import { getAllVideosType } from '@/validations/videoSchema';
import mongoose from 'mongoose';

export const getAllVideos = async (input: getAllVideosType) => {
    const { searchQuery } = input
    try {
        const searchCondition = searchQuery
            ? {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                ],
            }
            : {};

        const videos = await Video.find(searchCondition)
            .populate('thumbnail')
            .populate({
                path: 'course',
                select: 'title description slug'
            })

        return videos;
    } catch (error) {
        throw new Error('Error fetching videos');
    }
};

export const getVideoById = async (videoId: string) => {
    try {
        const userSession = await loadSession();

        const video = await Video.findById(videoId)
            .populate("thumbnail")
            .populate({
                path: "course",
                select: "title description slug",
            });

        if (!video) {
            return null;
        }

        const isUserWatchLater = await WatchLater.exists({
            video: video._id,
            user: userSession?.user?.id,
        });
        console.log("=============>", isUserWatchLater)
        return {
            ...video.toObject(),
            isWatchLater: !!isUserWatchLater,
        };
    } catch (error) {
        console.error("Error in getVideoById:", error);
        throw new Error("Error fetching video");
    }
};
