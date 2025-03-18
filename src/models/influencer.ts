import mongoose, {
  InferSchemaType,
  model,
  Model,
  models,
  Schema,
} from "mongoose";

const influencerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, trim: true, lowercase: true },
    userName: { type: String, trim: true },
    totalReferrals: { type: Number, default: 0 },
    totalCommission: { type: Number, default: 0 },
    pendingCommission: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type InfluencerType = Model<InferSchemaType<typeof influencerSchema>>;
const Influencer: InfluencerType = models.Influencer || model("Influencer", influencerSchema);

export default Influencer;
