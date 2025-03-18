import mongoose, {
  InferSchemaType,
  model,
  Model,
  models,
  Schema,
} from "mongoose";

const SubscribedPlanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: function () {
        return this.plan.title === "🚀  STANDARD PLAN";
      },
    },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "PayPal", "Manual"],
      // required: true,
    },
    paymentId: {
      type: String,
      // required: true,
    }, // Payment ID from Stripe/PayPal
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    }, // Useful for future subscription handling
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

type SubscribedPlanType = Model<InferSchemaType<typeof SubscribedPlanSchema>>;
const SubscribedPlan: SubscribedPlanType =
  models.SubscribedPlan || model("SubscribedPlan", SubscribedPlanSchema);

export default SubscribedPlan;
