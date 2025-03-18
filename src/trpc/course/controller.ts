import { Badge, Course } from "@/models";
import { Quiz } from "@/models";
import { Section } from "@/models";
import { Video } from "@/models";
import PromisifiedVimeoClient from '@/utils/vimeo';
import { CreateCourseType, UpdateCourseType } from "@/validations/courseSchema";
import { TRPCError } from "@trpc/server";
export const createCourse = async (course: CreateCourseType) => {
  try {
    const { sections, image, ...rest } = course;

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
        const processedVideos = section.videos.map((video) => ({
          ...video,
          thumbnail: video.thumbnail?._id,
          course: newCourse._id,
        }));

        const videos = await Video.insertMany(processedVideos);

        console.log("reached there before quiz", section);
        let quiz;
        if (section.quiz) {
          console.log("reached inside quiz");
          quiz = await Quiz.create({
            title: section.quiz.title,
            mcqs: section.quiz.mcqs,
            course: newCourse._id,
          });
        }

        await Badge.create({
          title: `${section.title}`,
          description: section.title,
          course: newCourse._id,
          status: "published",
          image: image._id,
        });

        const newSection = await Section.create({
          title: section.title,
          videos: videos.map((video) => video._id),
          courseId: newCourse._id,
        });

        // Update the quiz with section ID
        if (quiz) {
          await Quiz.findByIdAndUpdate(quiz._id, {
            section: newSection._id,
          });
        }

        await Section.findByIdAndUpdate(newSection._id, {
          quiz: quiz?._id,
        });

        await Video.updateMany(
          { _id: { $in: videos.map((video) => video._id) } },
          { section: newSection._id }
        );

        return newSection;
      })
    );

    const updatedCourse = await Course.findByIdAndUpdate(
      newCourse._id,
      {
        sections: newSections.map((section) => section._id),
      },
      {
        new: true,
      }
    );

    return updatedCourse;
  } catch (err) {
    // console.clear();
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

    // Update course data
    const updatedCourse = await Course.findOneAndUpdate(
      { _id },
      {
        ...rest,
        image: image._id,
      },
      {
        new: true,
      }
    );

    if (!updatedCourse) {
      throw new Error("Course not found");
    }

    const existingSectionIds = new Set(
      updatedCourse.sections.map((section) => section._id.toString())
    );

    const newSections = await Promise.all(
      sections.map(async (section) => {
        const videos = await Promise.all(
          section.videos.map(async (video) => {
            const videoData = {
              ...video,
              course: updatedCourse._id,
              section: section._id, // Ensure section reference is added here
            };

            if (video._id) {
              // Update existing video with section ID
              return await Video.findByIdAndUpdate(video._id, videoData, {
                new: true,
              });
            } else {
              // Create new video with section ID
              const newVideo = new Video(videoData);
              await newVideo.save();
              return newVideo;
            }
          })
        );

        let quiz;
        if (section.quiz) {
          const quizData = {
            ...section.quiz,
            course: updatedCourse._id,
            section: section._id, // Ensure section reference for quiz
          };

          if (section.quiz._id) {
            quiz = await Quiz.findByIdAndUpdate(section.quiz._id, quizData, {
              new: true,
            });
          } else {
            quiz = await Quiz.create(quizData);
          }
        }

        let newSection;
        // If section exists, update it
        if (section._id && existingSectionIds.has(section._id.toString())) {
          newSection = await Section.findByIdAndUpdate(
            section._id,
            {
              title: section.title,
              videos: videos.map((video) => video?._id),
              quiz: quiz?._id,
              courseId: updatedCourse._id,
            },
            { new: true }
          );
        } else {
          // Create new section
          newSection = new Section({
            title: section.title,
            videos: videos.map((video) => video?._id),
            quiz: quiz?._id,
            courseId: updatedCourse._id,
          });
          await newSection.save();
        }

        // Update the quiz and section with each other's ID
        if (quiz) {
          await Quiz.findByIdAndUpdate(quiz._id, { section: newSection._id });
        }

        await Section.findByIdAndUpdate(newSection._id, {
          quiz: quiz?._id,
        });

        return newSection;
      })
    );

    // Update course sections with new section references
    updatedCourse.sections = newSections.map((section) => section?._id || ("" as any));
    await updatedCourse.save();

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