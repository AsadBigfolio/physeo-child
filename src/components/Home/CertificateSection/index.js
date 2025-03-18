"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import RightArrowWhite from "@/svgs/RightArrowWhite";
import RightArrow from "@/svgs/RightArrow";

const CertificateSection = () => {
  const swiperRef = useRef(null);
  const [currentCertificate, setCurrentCertificate] = useState(0);

  const courses = [
    {
      name: "Conspiracy",
      src: "/Final_Wendy/Conspiracy.jpg",
      title: "CCT - Certified Conspiracy Theorist",
    },
    {
      name: "Cryptozoology",
      src: "/Final_Wendy/Cryptozoology.jpg",
      title: "CRhD - Cryptozoology Expert Honorary",
    },
    {
      name: "Magicology",
      src: "/Final_Wendy/Magicology.jpg",
      title: "WZrD - Wizard Zeroth Regent",
    },
    {
      name: "Paranormal",
      src: "/Final_Wendy/Paranormal.jpg",
      title: "PAhD - Paranormal Advanced Honorary",
    },
    {
      name: "Phenomenology",
      src: "/Final_Wendy/Phenomenology.jpg",
      title: "PMhD - Phenomenology Master Honorary",
    },
    {
      name: "Ufology",
      src: "/Final_Wendy/UFOlogy.jpg",
      title: "NBA - Nuanced Bonafide Academic",
    },
    {
      name: "Unexplained",
      src: "/Final_Wendy/Unexplained.jpg",
      title: "PEhD - Phenomenology Expert Honorary",
    },
  ];

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();

  return (
    <div >
      <div className="bg-[#e7ddff] rounded-[20px] flex flex-col-reverse lg:flex-row shadow-md overflow-hidden">
        <div className="p-5 md:p-[45px] flex flex-col md:h-[400px] lg:h-auto justify-between gap-6">
          <Header title={courses[currentCertificate]?.title} />
          <SliderControls
            currentIndex={currentCertificate}
            totalItems={courses.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onDotClick={(index) => {
              swiperRef.current?.slideTo(index);
              setCurrentCertificate(index);
            }}
          />
        </div>
        <CertificateSwiper
          swiperRef={swiperRef}
          onSlideChange={(swiper) => setCurrentCertificate(swiper.activeIndex)}
          courses={courses}
        />
      </div>
    </div>
  );
};

const Header = ({ title }) => (
  <div>
    <h2 className="text-2xl font-bold text-darkPurple mb-2">
      Earn your <span className="text-primary">{title}</span><br /> Certificate
    </h2>
    <p className="text-gray-700 text-subtitle-md">
      Enhance your credentials and career prospects <br /> with this certificate.
    </p>
  </div>
);

const SliderControls = ({ currentIndex, totalItems, onPrev, onNext, onDotClick }) => (
  <div className="flex items-center gap-2 md:gap-4 ">
    <button
      type="button"
      onClick={onPrev}
      className="bg-white h-[39px] 2xl:h-11 w-[39px] 2xl:w-11 rounded-full flex items-center justify-center rotate-180 shadow-xl"
    >
      <RightArrow width={15} height={20} />
    </button>
    <DotIndicators
      currentIndex={currentIndex}
      totalItems={totalItems}
      onDotClick={onDotClick}
    />
    <button
      type="button"
      onClick={onNext}
      className="bg-primary h-[39px] 2xl:h-11 w-[39px] 2xl:w-11 rounded-full flex items-center justify-center shadow-xl"
    >
      <RightArrowWhite width={15} height={20} />
    </button>
  </div>
);

const DotIndicators = ({ currentIndex, totalItems, onDotClick }) => (
  <div className="flex justify-center gap-[2px] sm:gap-2 md:gap-3">
    {Array.from({ length: totalItems }, (_, index) => (
      <div
        key={index}
        className={`cursor-pointer transition-all rounded-full
          ${currentIndex === index ? "bg-primary" : "bg-gray-300"} 
          h-2 
          ${index === currentIndex ? "w-[20px] md:w-[30px]" : "w-[15px]"} 
          sm:h-2 sm:${index === currentIndex ? "w-[36px]" : "w-[24px]"}
          md:h-2 md:${index === currentIndex ? "w-[42px]" : "w-[28px]"}`}
        onClick={() => onDotClick(index)}
      />
    ))}
  </div>
);


const CertificateSwiper = ({ swiperRef, onSlideChange, courses }) => (
  <div className="w-full lg:w-1/2 ">
    <Swiper
      modules={[Navigation, Autoplay]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={onSlideChange}
      className="w-full h-full"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {courses.map((course, index) => (
        <SwiperSlide key={index}>
          <img
            src={course.src}
            alt={course.name}
            className="w-full h-full object-contain rounded-tr-none rounded-tl-none xl:rounded-[10px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default CertificateSection;
