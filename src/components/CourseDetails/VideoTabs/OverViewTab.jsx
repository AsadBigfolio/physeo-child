"use client"

import { useContext } from "react";
import UserCourseContext from "@/context/userCourse";

const OverViewTab = () => {
  const { currentVideoData } = useContext(UserCourseContext)

  const rating = 4.7;
  const flooredRating = Math.floor(rating);
  const totalStars = 5;

  const learningPoints = [
    "Lorem ipsum dolor sit amet, consecture wlit elit.",
    "Lorem ipsum dolor sit amet, consecture wlit elit.",
    "Lorem ipsum dolor sit amet, consecture wlit elit.",
    "Lorem ipsum dolor sit amet, consecture wlit elit.",
    "Lorem ipsum dolor sit amet, consecture wlit elit.",
    "Lorem ipsum dolor sit amet, consecture wlit elit.",
    "Lorem ipsum dolor sit amet, consecture wlit elit miamet, consecture wlit elit.",
  ];

  return (
    <div className="p-5 2xl:pt-[30px] 2xl:px-[50px] text-mainText flex flex-col pb-5">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12">
        {currentVideoData?.title}
      </h1>
      {currentVideoData?.description && <>
        <h2 className="text-title-lg mb-[10px] 2xl:mb-[30px]">Description</h2>
        <p className="text-subtitle-md w-[90%] mb-[30px] line-clamp-3">
          {currentVideoData?.description}
        </p></>}
      {/* <p className="text-para-lg font-poppins w-[90%] mb-[80px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p> */}
      {/* <div className="flex w-full h-[80px] mb-[80px]">
        <div className="pr-[50px] border-r-black border-r-[1px]">
          <p className="font-poppins font-bold text-[24px] mb-1">200+</p>
          <p className="font-syne text-para-lg">Students</p>
        </div>
        <div className="pl-[50px]">
          <div className="flex items-center space-x-[10px]">
            <p className="font-poppins font-bold text-[24px] mb-1">{rating}</p>
            <div className="flex">
              {Array.from({ length: totalStars }, (_, index) =>
                index < flooredRating ? (
                  <GoStarFill key={index} size={23} fill="#F6AE23" />
                ) : (
                  <GoStar key={index} size={23} />
                )
              )}
            </div>
          </div>
          <p className="font-syne text-para-lg">Reviews</p>
        </div>
      </div>
      <div className="mb-[60px] p-[30px] border-[1px] border-[#DDDDDD] rounded-2xl">
        <h2 className="text-[26px] font-syne text-mainText font-bold mb-[46px]">
          {"What you'll Learn"}
        </h2>
        <div className="grid grid-cols-2 gap-y-[30px]">
          {learningPoints.map((point, index) => (
            <div className="flex items-center space-x-[15px]" key={index}>
              <FiCheckCircle size={28} />
              <p className="font-poppins text-subtitle-md ">
                Lorem ipsum dolor sit amet, consecture wlit elit.{" "}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default OverViewTab;
