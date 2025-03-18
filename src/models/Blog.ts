import { Schema, models, model, InferSchemaType, Model } from "mongoose";

const blogSchema = new Schema(
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
    image: {
      type: Schema.Types.ObjectId,
      ref: "File",
      trim: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    category: {
      type: String,
      required: true,
      default: "",
    },
    status: {
      type: String,
      required: true,
    },
    order: Number,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type BlogType = Model<InferSchemaType<typeof blogSchema>>;
const Blog: BlogType = models.Blog || model("Blog", blogSchema);

export default Blog;
