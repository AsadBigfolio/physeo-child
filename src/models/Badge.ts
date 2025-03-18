import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const badgeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "why no title ?"],
      trim: true,
    },
    icon: {
      type: String,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
    description: {
      type: String,
    },
    order: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: "Section",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type BadgeType = Model<InferSchemaType<typeof badgeSchema>>;
const Badge: BadgeType = models.Badge || model("Badge", badgeSchema);

export default Badge;
