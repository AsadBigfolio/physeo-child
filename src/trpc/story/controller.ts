import {Story} from "@/models";

export const createStory = async ({
  name,
  image,
  role,
  status,
}) => {
  try {
    const newStory = new Story({
      name,
      image,
      role,
      status,
    });

    const story = await newStory.save();

    return { story, message: "Story added successfully." };
  } catch (error) {
    throw new Error(`Failed to create story: ${error.message}`);
  }
};
export const updateStory = async (
  id,
  { name, image, role, status }
) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      id,
      { name, image, role, status },
      { new: true }
    );

    if (!updatedStory) {
      throw new Error("Story not found.");
    }

    return { story: updatedStory, message: "Story updated successfully." };
  } catch (error) {
    throw new Error(`Failed to update Story: ${error.message}`);
  }
};

export const deleteStory = async (input: any) => {
  try {
    await Story.findByIdAndDelete(input.id);
    return
  } catch (error) {
    console.log(error)
  }
}