import TestimonialProvider from '@/providers/TestimonialProvider';
import getCourses from '@/queries/course/getCourses';

const layout = async ({ children, params }) => {

  return <TestimonialProvider  >{children}</TestimonialProvider>;
};
export default layout;
