import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isTrial: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    duration: {
      type: Number,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type VideoType = Model<InferSchemaType<typeof videoSchema>>;
const Video: VideoType = models.Video || model("Video", videoSchema);

export default Video;
