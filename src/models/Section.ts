import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    videos: {
      type: [Schema.Types.ObjectId],
      ref: "Video",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
    flashCardLink: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type SectionType = Model<InferSchemaType<typeof sectionSchema>>;

const Section: SectionType = models.Section || model("Section", sectionSchema);

export default Section;
