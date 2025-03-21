import { Badge, Course } from "@/models";
import { Quiz } from "@/models";
import { Section } from "@/models";
import { Video } from "@/models";
import Category from '@/models/Category';
import PromisifiedVimeoClient from '@/utils/vimeo';
import { CreateCourseType, UpdateCourseType } from "@/validations/courseSchema";
import { TRPCError } from "@trpc/server";
import { ObjectId } from 'mongodb';

export const createCourse = async (course: CreateCourseType) => {
  try {
    const { sections, image, ...rest } = course;

    // Check if course with the same slug exists
    const existingCourse = await Course.findOne({ slug: rest.slug });
    if (existingCourse) {
      throw new Error(
        JSON.stringify([
          {
            message: "Slug is not available",
            path: ["slug"],
          },
        ])
      );
    }

    const newCourse = await Course.create({ image: image._id, ...rest });

    const newSections = await Promise.all(
      sections.map(async (section) => {
        const processedVideos = await Promise.all(
          section.videos.map(async (video) => {
            let quizId: ObjectId | null = null;

            if (video.quiz) {
              const quiz = await Quiz.create({
                title: video.quiz.title,
                mcqs: video.quiz.mcqs || [],
                course: newCourse._id,
              });
              quizId = quiz._id;
            }

            return {
              ...video,
              thumbnail: video.thumbnail?._id,
              course: newCourse._id,
              ...(quizId && { quiz: quizId }),
            };
          })
        );
        const videos = await Video.insertMany(processedVideos);

        const newSection = await Section.create({
          ...section,
          title: section.title,
          videos: videos.map((video) => video._id),
          courseId: newCourse._id,
        });

        await Quiz.updateMany(
          { _id: { $in: videos.map((video) => video.quiz) } },
          { section: newSection._id }
        );

        await Video.updateMany(
          { _id: { $in: videos.map((video) => video._id) } },
          { section: newSection._id }
        );

        await Badge.create({
          title: `${section.title}`,
          description: section.title,
          course: newCourse._id,
          status: "published",
          image: image._id,
        });

        return newSection;
      })
    );

    // Update the course with new sections
    const updatedCourse = await Course.findByIdAndUpdate(
      newCourse._id,
      {
        sections: newSections.map((section) => section._id),
      },
      { new: true }
    );

    return updatedCourse;
  } catch (err) {
    console.log(err.message);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};


export const updateCourse = async (course: UpdateCourseType) => {
  try {
    const { _id, sections, image, ...rest } = course;

    const existingSectionsIds = sections.map((item) => item?._id).filter(Boolean)
    const existingSections = await Section.find({ courseId: _id })
    const sectionsToDelete = existingSections
      .filter((section) => !existingSectionsIds.includes(section._id.toString()))
      .map((section) => section._id);

    if (sectionsToDelete.length > 0) {
      await Section.deleteMany({ _id: { $in: sectionsToDelete } });
      await Video.deleteMany({ section: { $in: sectionsToDelete } });
    }
    // Update course data
    const updatedCourse = await Course.findByIdAndUpdate(
      _id,
      {
        ...rest,
        image: image._id,
      },
      { new: true }
    );

    if (!updatedCourse) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Course not found",
      });
    }

    const newSections = await Promise.all(
      sections.map(async (section) => {
        const processedVideos = await Promise.all(
          section.videos.map(async (video) => {
            let quizId: ObjectId | null = video.quiz?._id ? new ObjectId(video.quiz._id) : null;
            if (video.quiz) {
              const quizData = {
                title: video.quiz.title,
                mcqs: video.quiz.mcqs || [],
                course: updatedCourse._id,
              };

              if (video.quiz._id) {
                await Quiz.findByIdAndUpdate(video.quiz._id, quizData);
              } else {
                const newQuiz = await Quiz.create(quizData);
                quizId = newQuiz._id;
              }
            }

            if (video._id) {
              return await Video.findByIdAndUpdate(
                video._id,
                { ...video, thumbnail: video.thumbnail?._id, course: updatedCourse._id, ...(quizId && { quiz: quizId }), },
                { new: true }
              );
            } else {
              return await Video.create({ ...video, thumbnail: video.thumbnail?._id, course: updatedCourse._id, ...(quizId && { quiz: quizId }), });
            }
          })
        );

        const videoIds = processedVideos.map((video) => video?._id);

        let newSection: any;
        let existingSection: any;
        if (section._id) {
          newSection = await Section.findByIdAndUpdate(
            section._id,
            { ...section, title: section.title, videos: videoIds, courseId: updatedCourse._id },
            { new: true }
          );
          existingSection = newSection
        } else {
          newSection = await Section.create({ ...section, title: section.title, videos: videoIds, courseId: updatedCourse._id });
        }
        if (existingSection) {
          const existingDbVideos = await Video.find({ section: existingSection._id });

          const existingRequestVideoIds = existingSection.videos.map((v) => v._id.toString()).filter(Boolean);
          const videosToDelete = existingDbVideos
            .filter((video) => !existingRequestVideoIds.includes(video._id.toString()))
            .map((video) => video._id);
          if (videosToDelete.length > 0) {
            await Video.deleteMany({ _id: { $in: videosToDelete } });
          }
        }

        await Quiz.updateMany({ _id: { $in: videoIds } }, { section: newSection._id });
        await Video.updateMany({ _id: { $in: videoIds } }, { section: newSection._id });

        await Badge.findOneAndUpdate(
          { course: updatedCourse._id, title: section.title },
          { title: section.title, description: section.title, course: updatedCourse._id, status: "published", image: image._id },
          { upsert: true }
        );

        return newSection;
      })
    );

    // Update course with new section references
    await Course.findByIdAndUpdate(
      updatedCourse._id,
      { sections: newSections.map((section) => section._id) },
      { new: true }
    );

    return updatedCourse;
  } catch (err) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }
};



export const deleteCourseById = async (courseId) => {
  try {
    if (!courseId) {
      throw new Error("Course ID is required");
    }

    const result = await Course.deleteOne({ _id: courseId });
    await Video.deleteMany({ course: courseId });
    await Section.deleteMany({ courseId: courseId });
    await Quiz.deleteMany({ course: courseId });

    if (result.deletedCount === 0) {
      throw new Error("Course not found");
    }

    return { success: true, message: "Course deleted successfully" };
  } catch (error) {
    console.error("Error Deleting Course:", error.message);
    return { success: false, message: error.message };
  }
};

export const getAllCourses = async () => {
  try {
    // let sort = { createdAt: "-1" };
    const courses = await Course.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          value: "$_id",
          label: "$title",
          emailSuffix: "$emailSuffix",
        },
      },
    ]);
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    throw error;
  }
};
export const getAllCategories = async () => {
  try {
    const categories = await Category.find().lean()
    return categories;
  } catch (error) {
    console.error("Error fetching category:", error.message);
    throw error;
  }
};
// export const updateAllVideosDuration = async () => {
//   try {
//     const videos = await Video.find();
//     await Promise.all(
//       videos.map(async (video) => {
//         const videoVimeoId = video?.url.split("/").pop();
//         console.log("videoVimeoId", videoVimeoId);
//         const vim = await PromisifiedVimeoClient(`/videos/${videoVimeoId}`);
//         console.log('==============>', vim.duration);
//         const duration = vim.duration;
//         await Video.findByIdAndUpdate(video._id, { duration });
//       })
//     );
//     return { success: true, message: "Duration updated successfully" };
//   } catch (error) {
//     console.error("Error updating video duration:", error.message);
//     return { success: false, message: error.message };
//   }
// }