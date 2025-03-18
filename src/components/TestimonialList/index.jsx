import React from "react";
const dummyImage = "https://via.placeholder.com/150"
function TestimonialCard({ testimonial }) {
  return (
    <div
      className="bg-white border border-[#8350DF] px-[15px] 2xl:px-[27px] py-[20px] rounded-[10px] shadow-sm break-inside-avoid"
    >
      <div className="flex">
        <img
          src={testimonial?.image?.src ?? dummyImage}
          alt={testimonial?.userName}
          className="rounded-full mr-4 h-[40px] w-[40px] md:h-[40px] md:w-[40px]"
        />
        <div>
          <h4 className="text-base font-bold">{testimonial?.userName}</h4>
          <div className="text-yellow-500 flex text-lg">
            {"★".repeat(testimonial.rating)}
          </div>
          <p className="text-[#202020] text-xs]">{testimonial?.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialList({ testimonials }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
  );
}
