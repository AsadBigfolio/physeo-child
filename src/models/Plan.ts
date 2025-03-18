import mongoose, {
  InferSchemaType,
  model,
  Model,
  models,
  Schema,
} from "mongoose";

const planSchema = new Schema(
  {
    cardTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    planFeatures: [{ type: String }], // e.g., ["1 Course (any)", "10% Discount on Shop"]
    isSubscription: {
      type: Boolean,
      default: false,
    }, // For future conversion to subscriptions
    discount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type PlanType = Model<InferSchemaType<typeof planSchema>>;
const Plan: PlanType = models.Plan || model("Plan", planSchema);

export default Plan;
