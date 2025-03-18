import { Schema, model, Model, models, InferSchemaType } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "File",
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    sections: {
      type: [Schema.Types.ObjectId],
      ref: "Section",
    },
    tags: {
      type: [String],
    },
    students: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
    },
    rating: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type CourseType = Model<InferSchemaType<typeof courseSchema>>;

// Create and export the model
const Course: CourseType = models.Course || model("Course", courseSchema);

export default Course;
