import mongoose, { InferSchemaType, model, Model, models, Schema } from "mongoose";

const referralCodeSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED"],
      default: "ACTIVE",
    },
    usedBy: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        dateUsed: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type ReferralCodeType = Model<InferSchemaType<typeof referralCodeSchema>>;
const ReferralCode: ReferralCodeType = models.ReferralCode || model("ReferralCode", referralCodeSchema);

export default ReferralCode;
