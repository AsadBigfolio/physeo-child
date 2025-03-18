"use client";
import { useState } from "react";
import { cn } from "@/utils/classNames";
import { IoClose } from "react-icons/io5";
import Sidebar from ".";
const MobileSidebar = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  return (
    <div className="w-full md:hidden">
      <div className="bg-secondaryWhite px-5 py-6 w-full">
        <button
          type="button"
          className="w-full text-para-base border-[1px] border-primary rounded-[10px] py-2"
          onClick={() => setDisplaySidebar(true)}
        >
          Course Content
        </button>
      </div>
      <div
        className={cn(
          "bg-white fixed h-screen w-screen inset-0 z-50 transition-all p-4 flex flex-col overflow-scroll",
          displaySidebar ? "left-0" : "-left-full"
        )}
      >
        <span
          className="text-primary p-[10px] border-[1px] border-primary max-w-fit flex items-center justify-center rounded-full cursor-pointer mb-[50px]"
          onClick={() => setDisplaySidebar(false)}
        >
          <IoClose size={24} />
        </span>
        <Sidebar setDisplaySidebar={setDisplaySidebar} />
      </div>
    </div>
  );
};

export default MobileSidebar;
