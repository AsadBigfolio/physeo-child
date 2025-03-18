import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    text: 'Incredible resource for the supernatural! The variety of topics, from paranormal to magicology, is impressive. The short lectures make learning easy and enjoyable.',
    reviewer: 'William Doem',
    avatar: 'https://dummyimage.com/40x40/000/fff',
  },
  {
    id: 2,
    text: 'A perfect platform to explore the mystical! I never imagined learning could be this engaging. Highly recommend it to everyone interested in the unknown!',
    reviewer: 'Sarah Lee',
    avatar: 'https://dummyimage.com/40x40/000/fff',
  },
];

const ReviewsSection = () => {
  return (
    <div className="mb-[80px]">
      <h2 className="text-center text-heading-xl font-Syne  md:mb-[50px]">
        <span className="text-[#202020]">What Our </span>
        <span className="text-primary">Alumni Say</span>
      </h2>

      <section className="bg-gradient-to-br from-purple-50 to-white p-5 md:p-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative">
            <img
              src="./ReviewImage.jpeg"
              alt="Castle"
              className="rounded-[10px] w-full h-[444px] object-cover"
            />
            <div className="absolute top-4 left-4 text-white text-2xl font-bold">1000+</div>
            <div className="absolute bottom-[-2px] md:bottom-0 w-full xl:w-[400px] p-3 md:p-4 bg-white xl:rounded-tr-lg flex items-center">
              <h2 className="w-full text-base md:text-2xl font-semibold leading-[30px] font-poppins">
                <span className="text-[#202020]">Hear From Our<br /></span>
                <span className="text-primary">Satisfied Clients </span>
                <span className="text-[#202020]">Have to say</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-5 md:gap-5">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#f3eefc] rounded-[10px] p-5 relative flex flex-col gap-5 "
              >
                <div className="flex">
                  {Array(5).fill().map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.199a1 1 0 00.95.69h4.418c.969 0 1.371 1.24.588 1.81l-3.581 2.602a1 1 0 00-.364 1.118l1.357 4.2c.3.921-.755 1.688-1.538 1.118l-3.581-2.601a1 1 0 00-1.176 0L6.625 18.7c-.783.57-1.838-.197-1.538-1.118l1.357-4.2a1 1 0 00-.364-1.118L2.5 9.626c-.783-.57-.381-1.81.588-1.81h4.418a1 1 0 00.95-.69l1.357-4.199z" />
                    </svg>
                  ))}
                </div>
                <p className="text-subtitle-md leading-[30px] text-gray-600">{review.text}</p>
                <div className="flex items-center">
                  <img
                    src={review.avatar}
                    alt={review.reviewer}
                    className="rounded-[10px] w-10 h-10"
                  />
                  <div className="ml-3">
                    <p className="text-title-lg font-semibold text-gray-800">{review.reviewer}</p>
                  </div>
                  <div className="absolute h-9 w-9 bg-[#f3eefc] flex items-center justify-center right-0 -bottom-5 rounded-full border-4 border-white">
                    <Link href='/testimonial' className="text-primary">
                      <FaArrowRight className="-rotate-[35deg]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-action button */}
        <div className="w-full h-[70px] px-5 md:px-8 mt-8 py-3 md:py-4 bg-primary rounded-[10px] flex items-center justify-between">
          <div className="text-white text-base md:text-2xl font-semibold">Are you the next one?</div>
          <div className="w-[95px] md:w-[120px] h-[35px] md:h-10 flex items-center justify-center border border-white rounded-full">
            <Link href='/testimonial' className="text-white text-sm md:text-base font-semibold cursor-pointer">View all</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
