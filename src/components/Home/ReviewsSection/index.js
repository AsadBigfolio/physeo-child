"use client"
import BadgesSlider from '@/components/Slider/swipper';
import RightArrow from '@/svgs/RightArrow';
import RightArrowWhite from '@/svgs/RightArrowWhite';
import React, { useRef, useState } from "react";

const videoReviews = [
  { thumbnail: "/new/video1image.png" },
  { thumbnail: "/new/video2image.png" },
  { thumbnail: "/new/video3image.png" },
  { thumbnail: "/new/video1image.png" },
  { thumbnail: "/new/video2image.png" },
  { thumbnail: "/new/video3image.png" },
  { thumbnail: "/new/video1image.png" },
  { thumbnail: "/new/video2image.png" },
  { thumbnail: "/new/video3image.png" },
];

const reviews = [
  {
    rating: 5,
    title: "The Best course, you can find for USMLE.",
    description:
      "This is a great intermediate level course that provides a comprehensive overview of all the main AWS services. There is sufficient hands on included to help in gaining familiarity with the most important features/servcies of AWS. It would have helped if ML/AI services were also covered (overview) as this course already covers a good portion of DevOps, Networking & Security",
    name: "Alexa Smith",
    role: "Student at Oxford",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const VideoReviewCard = ({ thumbnail, videoUrl = "/banner-vedios/hero_vid (720p).mp4" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div className="relative rounded-[10px] border border-[#E3E3E3] h-[440px] group cursor-pointer">
        <img
          src={thumbnail}
          alt="Video Review"
          className="w-full h-full object-cover rounded-[10px] group-hover:opacity-90 transition-opacity duration-300"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
          <button onClick={handlePlay} className="focus:outline-none">
            <img
              className='flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition-transform duration-200'
              src='/new/play-circle.svg'
              alt="Play video"
            />
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 animate-fadeIn">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={handleClose}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={videoUrl}
                className="w-full h-[440px] rounded-[12px]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video Review"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const TestimonialCard = ({ review }) => (
  <div className="bg-[#EFF4F8] p-5 rounded-[10px] border border-[#E3E3E3] h-[440px] flex flex-col">
    <div className="flex flex-col gap-[16px] flex-grow">
      <div className="flex items-center gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <img key={i} src="/new/courseRatingStar.svg" alt="star" />
        ))}
      </div>
      <h3 className="text-[22px] leading-[30px] font-semibold text-mainText">{review.title}</h3>
    </div>
    <p className="muted-description mt-[12px]">
      {review.description}
    </p>
    <div className="flex items-center gap-3 mt-[48px]">
      <img src={review.avatar} alt="User" className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="font-medium text-[16px] text-mainText">{review.name}</h4>
        <p className="text-[12px] font-[450] text-primary-muted">{review.role}</p>
      </div>
    </div>
  </div>
);
const TestimonialsSection = () => {
  const swiperRef = useRef(null);

  return (
    <div className="py-8 w-full  flex flex-col gap-[36px]">
      <div className='flex justify-between items-center'>
        <h1 className="section-heading">See what others are achieving</h1>
        <div className="flex gap-4">
          <button onClick={() => swiperRef.current?.slidePrev()} className="h-[42px] w-[42px] rotate-180 rounded-full flex items-center justify-center border-[1.4px] border-[#BED2E6]">
            <RightArrow width={24} height={19} />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className="h-[42px] w-[42px] rounded-full flex items-center justify-center border-[1.4px] border-[#BED2E6]">
            <RightArrowWhite width={15} height={20} />
          </button>
        </div>
      </div>

      <BadgesSlider sliderClass={"!w-[300px]"} swiperRef={swiperRef}>
        {videoReviews.map((video, index) => (
          <div key={index} >
            {index !== 0 && <VideoReviewCard thumbnail={video.thumbnail} />}
            {index === 0 && <TestimonialCard review={reviews[0]} />}
          </div>
        ))}
      </BadgesSlider>
    </div>
  );
};

export default TestimonialsSection;
