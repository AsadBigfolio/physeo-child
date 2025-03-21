import { Schema, model, Model, models, InferSchemaType } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'why no title ?'],
        trim: true,
    },
    icon: {
        type: String,
        trim: true,
    },
    bannerUrl: {
        type: String,
        trim: true,
    },
    bannerUrlMobile: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
    versionKey: false,
});

type CategoryType = Model<InferSchemaType<typeof categorySchema>>;

// Create and export the model
const Category: CategoryType = models.Category || model("Category", categorySchema);

export default Category;