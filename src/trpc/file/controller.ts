import { s3 } from "@/utils/aws";
import { v4 as uuid } from "uuid";
import { File, Badge, Blog, Course, Story, Video } from "@/models";
import { SignedUrlType, UploadTODBType } from "@/validations/fileSchema";

export const generateS3Url = async ({ fileName, fileType }: SignedUrlType) => {
  const [name, fileExtension] = fileName.split(".");
  const uniqueFileName = `${name}_${uuid()}.${fileExtension}`;
  const uploadParams = {
    Bucket: process.env.S3_BUCKETNAME,
    Key: `files/${uniqueFileName}`,
    ContentType: fileType,
    Expires: 30, // 30 seconds
  };

  try {
    const uploadUrl = await s3.getSignedUrlPromise("putObject", uploadParams);
    const publicUrl = `https://superu.s3.us-east-2.amazonaws.com/files/${uniqueFileName}`;

    return { uploadUrl, publicUrl };
  } catch (error) {
    console.error("Error generating upload URL:", error);
    return Promise.reject("Failed to generate upload URL");
  }
};

export const uploadToDB = async (files: UploadTODBType, user) => {
  const isAdmin = user.role === "admin";
  try {
    const fileRecords = await Promise.all(
      files.map(async (file) => {
        const fileRecord = await File.create({
          name: file.name,
          size: file.size,
          type: file.type,
          src: file.src,
          createdVia: isAdmin ? "admin" : "user",
        });

        return fileRecord;
      })
    );
    return fileRecords;
  } catch (error) {
    console.error("Failed to add files to db ", error.message);
    return Promise.reject("Failed to add file to database");
  }
};

export const deleteFile = async (input: any) => {
  try {
    await File.findByIdAndDelete(input.id);

    await Story.updateMany(
      { image: input.id },
      { $set: { image: null } }
    );
    await Badge.updateMany(
      { image: input.id },
      { $set: { image: null } }
    );
    await Blog.updateMany(
      { image: input.id },
      { $set: { image: null } }
    );
    await Course.updateMany(
      { image: input.id },
      { $set: { image: null } }
    );
    await Video.updateMany(
      { thumbnail: input.id },
      { $set: { image: null } }
    );

    return
  } catch (error) {
    console.log(error)
  }
}
