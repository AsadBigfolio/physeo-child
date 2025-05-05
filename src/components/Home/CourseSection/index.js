"use client";
import BadgesSlider from '@/components/Slider/swipper';
import RightArrow from '@/svgs/RightArrow';
import RightArrowWhite from '@/svgs/RightArrowWhite';
import Image from 'next/image';
import { useRef } from 'react';

const InfoSection = ({ infoItems }) => {
  return (
    <div className="flex items-center mt-[12px] gap-[8px] leading-[20px] font-[500] text-primary-muted text-[12px]">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center bg-[#E7EEF3] rounded-[4px] h-[26px] px-[8px]">
          <Image height={15} width={15} alt={item.text} src={item.icon} /> <span className="ml-[4px]">{item.text}</span>
        </div>
      ))}
    </div>
  );
};
function CourseCard() {
  const infoItems = [
    { icon: "./new/clock.svg", text: "84 hours" },
    { icon: "./new/document-text.svg", text: "9 articles" },
    { icon: "./new/profile-2user.svg", text: "604" },
  ];

  return (
    <div className="rounded-[12px] border-[2px]  bg-white">
      <img
        className="w-full rounded-t-[12px] h-[178px] object-cover"
        src="./new/image.png"
        alt="Course Thumbnail"
      />
      <div className="p-[16px]">
        <div className='flex flex-col gap-[8px]'>
          <h3 className="text-title-lg card-heading">
            This Figma course is all about designing websites for impact...
          </h3>
          <p className="muted-description">Rana Basit</p>
          <div className="flex gap-x-[6px] items-center">
            <span className="text-[15px] leading-[20px] font-[600] text-[#966600]">5.0</span>
            <div className='flex gap-x-[1.34px]'>
              {[1, 1, 1, 1, 1].map((_, index) => (<img key={index} src="./new/courseRatingStar.svg" alt='rating-star' />))}
            </div>
            <span className="muted-description">(12)</span>
          </div>
        </div>
        <InfoSection infoItems={infoItems} />
      </div>
    </div>
  );
}

const CourseSection = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();
  return (
    <div className="py-5 md:py-[24px] ">
      <div className='max-w-[1320px] mx-auto flex flex-col gap-[36px]'>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className="text-left section-heading">
              Courses
            </h1>
            <div className="z-[100] flex gap-7">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white border-1 h-[42px] w-[42px] rounded-full flex items-center justify-center rotate-180 border-[1.4px] border-[#BED2E6]"
              >
                <RightArrow width={24} height={19} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-bg-white h-[42px] w-[42px] rounded-full flex items-center justify-center border-[1.4px] border-[#BED2E6]"
              >
                <RightArrowWhite width={15} height={20} />
              </button>
            </div>
          </div>
        </div>
        <BadgesSlider sliderClass="!w-[315px]" swiperRef={swiperRef}>
          {[1, 1, 1, 1, 1, 1, 11, 1, 1, 11, 1, 11, 1,].map((index) => (
            <CourseCard key={index} />
          ))}

        </BadgesSlider>
      </div>
    </div>
  );
};

export default CourseSection;
