import TestimonialList from "@/components/TestimonialList";
import Banner from "@/components/UI/Banner";
import { getTestimonials } from '@/queries/testimonial/getTestimonials';
import React from "react";
export const metadata = {
  title: 'Testimonial',
  description: "Super Natural",
};

const Testimonial = async () => {
  const testimonials = await getTestimonials(1, 1000, '&status=publish')

  return (
    <section className="bg-secondaryWhite">
      <Banner title="Testimonials" />
      <div className="max-w-[1320px] px-[20px] py-5 md:py-[80px] mx-auto">
        <h1 className="text-[24px] text-center md:text-left font-semibold font-Syne leading-[61.44px] mb-[20px] md:mb-[50px]">
          <span >What our </span>
          <span className="text-primary">Alumni </span>
          <span >Say.</span>
        </h1>

        <TestimonialList testimonials={JSON.parse(JSON.stringify(testimonials?.testimonials)) ?? []} />
      </div>
    </section>
  );
};

export default Testimonial;
