import mongoose, { Schema, model, models, InferSchemaType, Model } from "mongoose";

const newsletterUserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

type NewsletterUserType = Model<InferSchemaType<typeof newsletterUserSchema>>;
const NewsletterUser: NewsletterUserType = models.NewsletterUser || model("NewsletterUser", newsletterUserSchema);

export default NewsletterUser;
