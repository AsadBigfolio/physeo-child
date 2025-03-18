"use client";

import { cn } from '@/utils/classNames';
import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

const DetailsDropDown = ({ title, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to turn URLs in the details string into clickable links
  const parseLinks = (text) => {
    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary underline">$1</a>'
    );
  };

  return (
    <div className={`transition-all rounded-[30px] duration-700 ${isOpen ? "bg-white" : "bg-transparent"}`}>
      <div
        onClick={toggleDetails}
        className={`cursor-pointer font-poppins py-[12px] md:py-[5px] px-[20px] 2xl:p-4 text-title-lg rounded-full flex justify-between items-center transition-colors duration-300 ${
          isOpen
            ? "bg-primary text-white"
            : "bg-transparent text-primary border-[1px] border-primary"
        }`}
      >
        <p>{title}</p>
        <div className={cn("transform transition-all duration-300", isOpen ? "rotate-[135deg] text-white" : "rotate-0 text-primary")}>
          <IoAddOutline size={32} />
        </div>
      </div>
      <div
        className={`transition-all duration-300 px-4 overflow-hidden text-subtitle-md rounded-3xl ${
          isOpen ? "max-h-96 opacity-100 py-[15px] 2xl:py-[20px]" : "max-h-0 opacity-20"
          } text-mainText`}
        style={{
          transitionProperty: "max-height, opacity, padding",
        }}
        dangerouslySetInnerHTML={{ __html: parseLinks(details) }}
      />
    </div>
  );
};

export default DetailsDropDown;
