import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const referralSchema = new Schema(
    {
        influencer: {
            type: Schema.Types.ObjectId,
            ref: "Influencer",
            required: true,
        },
        student: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        studentEmail: {
            type: String,
            required: true,
            trim: true,
        },
        studentName: {
            type: String,
            required: true,
            trim: true,
        },
        plan: {
            planName: { type: String, required: true },
        },
        commissionSent: { type: Boolean, default: false },
        commission: {
            type: Number,
            default: 0,
        },
        isRefund: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

type ReferralType = Model<InferSchemaType<typeof referralSchema>>;

const Referral: ReferralType = models.Referral || model("Referral", referralSchema);

export default Referral;
