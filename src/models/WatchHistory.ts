import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const watchHistorySchema = new Schema(
  {
    progress: {
      type: Number,
      default: 0,
    },
    totalLength: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      // required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
type WatchHistoryType = Model<InferSchemaType<typeof watchHistorySchema>>;
const WatchHistory: WatchHistoryType =
  models.WatchHistory || model("WatchHistory", watchHistorySchema);
export default WatchHistory;
