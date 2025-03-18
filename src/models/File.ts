import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const fileSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    src: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number, // in bytes
      required: true,
    },
    createdVia: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
type FileType = Model<InferSchemaType<typeof fileSchema>>;

const File: FileType = models.File || model("File", fileSchema);

export default File;
