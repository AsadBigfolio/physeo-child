import {Story} from "@/models";
import { GetStoryType } from "@/validations/storySchema";

export const getStories = async ({
  page = 1,
  pageSize = 10,
  searchQuery = "",
}: GetStoryType) => {
  try {
    const query = {} as any;

    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    const skip = (page - 1) * pageSize;
    const stories = await Story.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate("image");

    const totalStories = await Story.countDocuments(query);

    return {
      stories,
      totalStories,
      totalPages: Math.ceil(totalStories / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStoryById = async (id: string) => {
  try {
    const story = await Story.findById(id).populate("image");
    if (!story) {
      throw new Error("Story not found.");
    }
    return story;
  } catch (error) {
    throw new Error(`Failed to get story by id: ${error.message}`);
  }
};
