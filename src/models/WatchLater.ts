import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const watchLaterSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type WatchLaterType = Model<InferSchemaType<typeof watchLaterSchema>>;
const WatchLater: WatchLaterType = models.WatchLater || model("WatchLater", watchLaterSchema);

export default WatchLater;
