import Testimonial from '@/models/Testimonial';

export const getTestimonials = async (page = 1, pageSize = 10, searchQuery = "") => {
    try {
        const query: any = {};
        const searchParams = new URLSearchParams(searchQuery);
        for (const [key, value] of searchParams.entries()) {
            if (key !== "search") {
                query[key.toLowerCase()] = { $regex: value, $options: "i" };
            } else {
                query.message = { $regex: value, $options: "i" };
            }
        }
        const skip = (page - 1) * pageSize;
        const testimonials = await Testimonial.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageSize)
            .populate("image");

        const totalTestimonials = await Testimonial.countDocuments(query);

        if (!testimonials.length) {
            return { testimonials: [] };
        }

        return {
            testimonials,
            totalTestimonials,
            totalPages: Math.ceil(totalTestimonials / pageSize),
            currentPage: page,
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getTestimonialById = async (id: string) => {
    try {
        const testimonial = await Testimonial.findById(id).populate("image");
        if (!testimonial) {
            throw new Error("Testimonial not found.");
        }
        return JSON.stringify(testimonial);
    } catch (error) {
        throw new Error(`Failed to get testimonial by id: ${error.message}`);
    }
};

export const getTestimonialDetail = async (userName: string) => {
    try {
        const testimonial = await Testimonial.findOne({ userName }).populate("image");

        if (!testimonial) {
            throw new Error("Testimonial not found.");
        }
        return {
            testimonial
        };
    } catch (error) {
        throw new Error(`Failed to get testimonial detail: ${error.message}`);
    }
};
