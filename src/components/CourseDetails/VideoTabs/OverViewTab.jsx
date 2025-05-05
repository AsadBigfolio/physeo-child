"use client"
import React, { useState } from 'react';
import { FaHeadphones, FaQuestionCircle, FaBook, FaShare, FaBookmark } from 'react-icons/fa';
import { useContext } from "react";
import { handleShare } from '@/utils/share';
import { trpc } from '@/utils/trpcClient';
import UserContext from '@/context/user';
import { toast } from 'sonner';


const OverViewTab = ({ currentVideoData }) => {
  const { user } = useContext(UserContext)
  const { topics, title, description, isWatchLater } = currentVideoData || {};
  const [isWatchLaterState, setIsWatchLaterState] = useState(isWatchLater)
  const { mutate: createWatchLaterMutation } = trpc.userCourse.createWatchLater.useMutation({
    onSuccess: () => {
      toast.success('Added to watch letter.')
      setIsWatchLaterState(true)
    }
  });
  const addWatchLater = () => {
    createWatchLaterMutation({
      user: user?._id,
      course: currentVideoData?.course?._id,
      video: currentVideoData?._id,
      section: currentVideoData?.section
    })
  }
  const buttons = [
    { icon: <FaHeadphones />, text: 'Listen' },
    { icon: <FaQuestionCircle />, text: 'Quiz' },
    { icon: <FaBook />, text: 'Textbook' },
    { icon: <FaShare />, text: 'Share', onClick: (e) => handleShare(e, currentVideoData?.videoUrl) },
    { icon: <FaBookmark />, text: 'Save', onClick: addWatchLater, className: isWatchLaterState ? 'cursor-not-allowed opacity-50 pointer-events-none' : '' }
  ];


  return (
    <div>
      <div className='flex flex-col gap-[12px] mt-[20px]'>
        <h1 className="text-3xl font-[600] text-mainText">
          {title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`flex gap-[9px] items-center bg-white rounded-full border font-[600] text-[14px] px-[16px] py-[10px] border-[#E3E3E3] text-mainText ${button.className ?? ""}`}
              onClick={button?.onClick && button.onClick}
            >
              <span>{button.icon}</span>
              {button.text}
            </button>
          ))}
        </div>

        <p className="muted-description">
          {description}
        </p>
      </div>

      <div className="rounded-lg p-[20px] flex flex-col gap-[20px] mt-[32px] bg-white">
        <h2 className="text-[24px] font-bold">Topics</h2>

        <div className="flex flex-wrap gap-x-[10px] gap-y-[16px]">
          {topics?.map((topic, index) => (
            <span
              key={index}
              className="px-[12px] py-[6px] text-[14px] font-[450] bg-[#E7EEF3] rounded-[8px] text-mainText"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverViewTab;