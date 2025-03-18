"use client";
import { useState, useRef, useEffect } from "react";
import RightArrow from "@/svgs/RightArrow";
import RightArrowWhite from "@/svgs/RightArrowWhite";
import "./Slider.css";

const Slider = ({ children, showPagination = true, onchange }) => {
  const sliderRef = useRef(null);
  const [sliderState, setSliderState] = useState({
    totalSlides: 1,
    currentSlide: 0,
    slideWidth: 0,
  });

  const updateSliderState = () => {
    if (sliderRef.current) {
      const width = sliderRef.current.getBoundingClientRect().width;
      const firstChildWidth =
        sliderRef.current.firstChild?.getBoundingClientRect().width;
      const totalSlides = sliderRef.current.children.length;

      setSliderState((prevState) => ({
        ...prevState,
        totalSlides,
        slideWidth: firstChildWidth,
      }));
    }
  };

  useEffect(() => {
    updateSliderState();
    window.addEventListener("resize", updateSliderState);
    return () => {
      window.removeEventListener("resize", updateSliderState);
    };
  }, []);

  const handleNextButton = () => {
    const { currentSlide, totalSlides, slideWidth } = sliderState;

    const isLastSlide = currentSlide === totalSlides - 1;
    const nextSlidePosition = isLastSlide ? 0 : sliderRef.current.scrollLeft + slideWidth;

    sliderRef.current.scrollTo({
      left: nextSlidePosition,
      behavior: "smooth",
    });

    setSliderState((prevState) => ({
      ...prevState,
      currentSlide: isLastSlide ? 0 : currentSlide + 1,
    }));

    onchange && onchange(isLastSlide ? 0 : currentSlide + 1);
  };

  const handleBackButton = () => {
    const { currentSlide, totalSlides, slideWidth } = sliderState;

    const isFirstSlide = currentSlide === 0;
    const prevSlidePosition = isFirstSlide
      ? (totalSlides - 1) * slideWidth
      : sliderRef.current.scrollLeft - slideWidth;

    sliderRef.current.scrollTo({
      left: prevSlidePosition,
      behavior: "smooth",
    });

    setSliderState((prevState) => ({
      ...prevState,
      currentSlide: isFirstSlide ? totalSlides - 1 : currentSlide - 1,
    }));

    onchange && onchange(isFirstSlide ? totalSlides - 1 : currentSlide - 1);
  };

  const { totalSlides, currentSlide } = sliderState;

  return (
    <div className="relative">
      <div
        className="flex overflow-scroll w-full gap-5 slider-container"
        ref={sliderRef}
      >
        {children}
      </div>
      {showPagination && (
        <div className="flex justify-center mt-[50px]">
          {Array.from({ length: totalSlides }, (_, index) => (
            <div
              key={index}
              className={`h-2 mx-1.5 cursor-pointer rounded-full transition-all duration-300
             ${currentSlide === index ? "bg-primary w-8" : "bg-[#C4C4C4] w-4"}`}
              onClick={() => {
                const targetPosition = index * sliderState.slideWidth;
                sliderRef.current.scrollTo({
                  left: targetPosition,
                  behavior: "smooth",
                });
                setSliderState((prevState) => ({
                  ...prevState,
                  currentSlide: index,
                }));
              }}
            />
          ))}
        </div>

      )}
      <div className="absolute top-1/2 translate-y-[-50%] right-[10vw] z-[100] flex flex-col gap-7">
        <button
          type="button"
          onClick={handleBackButton}
          className="bg-white h-[39px] w-[39px] rounded-full flex items-center justify-center rotate-180 shadow-xl"
        >
          <RightArrow width={24} height={19} />
        </button>
        <button
          type="button"
          onClick={handleNextButton}
          className="bg-primary h-[39px] w-[39px] rounded-full flex items-center justify-center shadow-xl"
        >
          <RightArrowWhite width={24} height={19} />
        </button>
      </div>
    </div>
  );
};

export default Slider;