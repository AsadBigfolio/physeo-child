"use server";
import { z } from "zod";

const schema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(2),
    image: z.string().url(),
    status: z.enum(["draft", "published"]),
    tags: z.string().optional(),
    section: z.string()
      .min(1, { message: "Select section." })
  })

const addCourse = async (prev, formData) => {
  const courseData = {};

  formData.forEach((value, key) => {
    courseData[key] = value;
  });

  try {
    const result = schema.safeParse(courseData);

    if (!result.success) {
      return {
        validationErrors: result.error.errors.map((error) => ({
          field: error.path.join("."),
          message: error.message,
        })),
        success: false,
        error: null,
      };
    }

    const { title, description, image, status, tags } = courseData;

    return courseData

    // const newCourse = new Course({
    //   title,
    //   description,
    //   image,
    //   status,
    //   tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    // });

    // await newCourse.save();

    // return {
    //   validationErrors: null,
    //   success: true,
    //   error: null,
    // };
  } catch (err) {
    console.error(err);
    return {
      validationErrors: null,
      success: false,
      error: err.message,
    };
  }
};

export default addCourse;
