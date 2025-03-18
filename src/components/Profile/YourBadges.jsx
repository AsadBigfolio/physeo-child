"use client";
import UserContext from "@/context/user";
import { useContext, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import BadgesSlider from "../Slider/swipper";
import RightArrow from '@/svgs/RightArrow';
import RightArrowWhite from '@/svgs/RightArrowWhite';

const YourBadges = () => {
  const { user } = useContext(UserContext);
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div>
      {user?.badges?.length > 0 && (
        <div className="w-full flex flex-col ">
          <div className='flex justify-between items-center pb-5'>
            <h1 className="text-[24px] text-center md:text-left md:text-5xl font-semibold font-Syne leading-[30.72px] md:leading-[61.44px] ">
            Earned <span className="text-primary">Badges</span>
          </h1>
            <div className="z-[100] flex gap-7">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white h-[39px] 2xl:h-11 w-[39px] 2xl:w-11 rounded-full flex items-center justify-center rotate-180 shadow-xl"
              >
                <div className="hidden 2xl:block">
                  <RightArrow width={24} height={19} />
                </div>
                <div className="block 2xl:hidden">
                  <RightArrow width={15} height={20} />
                </div>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-primary h-[39px] 2xl:h-11 w-[39px] 2xl:w-11 rounded-full flex items-center justify-center shadow-xl"
              >
                <div className="block 2xl:hidden">
                  <RightArrowWhite width={15} height={20} />
                </div>
                <div className="hidden 2xl:block">
                  <RightArrowWhite width={24} height={19} />
                </div>
              </button>
            </div>
          </div>
          <div className="">
            <BadgesSlider swiperRef={swiperRef}>
              {user?.badges?.map((badge, index) => (
                <SwiperSlide
                  className=" flex-col items-center !w-[180px]"
                  key={index}
                >
                  <div className='w-[180px]'>
                    <div className="rounded-full flex overflow-hidden w-[160px] h-[160px]">
                    <img
                      src={badge?.badge?.image?.src}
                      className="w-full h-full object-cover"
                      alt={badge?.badge?.title || "Badge image"}
                    />
                  </div>
                    <p className="mt-4 text-lg font-medium text-gray-800 w-[160px] text-center">
                    {badge?.badge?.title ?? ""}
                  </p>
                  </div>
                </SwiperSlide>
              ))}
            </BadgesSlider>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourBadges;
