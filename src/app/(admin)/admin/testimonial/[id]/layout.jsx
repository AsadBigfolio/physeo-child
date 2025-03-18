import BadgeProvider from '@/providers/BadgeProvider';
import TestimonialProvider from '@/providers/TestimonialProvider';
import getCourses from '@/queries/course/getCourses';
import { getTestimonialById } from '@/queries/testimonial/getTestimonials';

const layout = async ({ children, params }) => {
  const { id } = params
  const testimonial = await getTestimonialById(id)
  const testimonialDetails = JSON.parse(testimonial)
  const updatedData = {
    ...testimonialDetails,
    image: testimonialDetails?.image ? [testimonialDetails?.image] : [],

  }
  return <TestimonialProvider defaultTestimonial={updatedData} >{children}</TestimonialProvider>;
};
export default layout;
