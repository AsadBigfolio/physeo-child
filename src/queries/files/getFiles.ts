import { File } from "@/models";
import { GetFilesType } from "@/validations/fileSchema";

export const getFiles = async ({
  page = 1,
  pageSize = 10090,
  search = "",
}: GetFilesType) => {
  try {
    const query = {} as any;

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * pageSize;
    const files = await File.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
    const totalFiles = await File.countDocuments(query);

    if (!files) {
      throw new Error("Files not found");
    }

    return {
      files,
      totalFiles,
      totalPages: Math.ceil(totalFiles / pageSize),
      currentPage: page,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export const uploadFile = async () => {
  try {
  } catch (error) {
    throw new Error(error.message);
  }
};