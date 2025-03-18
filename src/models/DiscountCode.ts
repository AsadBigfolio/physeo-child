import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const adminDiscountCodeSchema = new Schema(
  {
    percentage: {
      type: Number,
      required: true,
    },
    discountCode: {
      type: String,
      required: true,
      trim: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type AdminDiscountCodeType = Model<InferSchemaType<typeof adminDiscountCodeSchema>>;

const AdminDiscountCode: AdminDiscountCodeType =
  models.AdminDiscountCode || model("AdminDiscountCode", adminDiscountCodeSchema);

export default AdminDiscountCode;
