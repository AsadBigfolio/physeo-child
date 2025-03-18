import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const testimonialSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "User name is required"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        image: {
            type: Schema.Types.ObjectId,
            ref: "File",
        },
        status: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

type TestimonialType = Model<InferSchemaType<typeof testimonialSchema>>;
const Testimonial: TestimonialType = models.Testimonial || model("Testimonial", testimonialSchema);

export default Testimonial;
