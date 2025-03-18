import { Schema, models, model, InferSchemaType, Model } from "mongoose";
const storySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      trim: true,
    },
    order: Number,
    image: {
      type: Schema.Types.ObjectId,
      ref: "File",
      trim: true,
    },
    status: {
      type: String,
      required: [true, "status is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type StoryType = Model<InferSchemaType<typeof storySchema>>;
const Story: StoryType = models.Story || model("Story", storySchema);

export default Story;
