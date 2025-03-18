import Testimonial from '@/models/Testimonial';
import { TestimonialCreateType, TestimonialDeleteType, TestimonialUpdateType } from '@/validations/testimonialSchema';

export const createTestimonial = async (testimonial: TestimonialCreateType) => {
    try {
        const newTestimonial = await Testimonial.create(testimonial);

        return { testimonial: newTestimonial };
    } catch (error) {
        throw new Error(`Failed to create testimonial: ${error.message}`);
    }
};

export const updateTestimonial = async (testimonial: TestimonialUpdateType) => {
    const { id, ...rest } = testimonial;
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, rest, { new: true });

        if (!updatedTestimonial) {
            throw new Error("Testimonial not found.");
        }

        return { testimonial: updatedTestimonial };
    } catch (error) {
        throw new Error(`Failed to update testimonial: ${error.message}`);
    }
};

export const deleteTestimonial = async (ids: TestimonialDeleteType) => {
    try {
        if (Array.isArray(ids)) {
            const deletedTestimonials = await Testimonial.deleteMany({ _id: { $in: ids } });
            if (deletedTestimonials.deletedCount === 0) {
                throw new Error("No testimonials found to delete.");
            }
            return { message: `${deletedTestimonials.deletedCount} testimonial(s) deleted.` };
        } else {
            const deletedTestimonial = await Testimonial.findByIdAndDelete(ids);
            if (!deletedTestimonial) {
                throw new Error("Testimonial not found.");
            }
            return { message: "Testimonial deleted." };
        }
    } catch (error) {
        throw new Error(`Failed to delete testimonial: ${error.message}`);
    }
};
