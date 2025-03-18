import { Video } from '@/models';
import { getAllVideosType } from '@/validations/videoSchema';

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
