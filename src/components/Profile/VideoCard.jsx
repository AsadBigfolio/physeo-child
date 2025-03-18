import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoStar } from "react-icons/go";
import { PiShareFatLight } from "react-icons/pi";
import VideoPlayButtonIcon from "@/svgs/VideoPlayButtonIcon";
import FavVideoStar from '@/svgs/FavVideoStar';
import { handleShare } from '@/utils/share';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const VideoCard = ({
  imageUrl,
  title,
  description,
  duration = 0,
  progress = 0,
  showProgress = false,
  videoData,
  index,
  totalRecords,
  isFav = false,
  handleWatcherLaterClick
}) => {
  const percentCompleted =
    duration > 0 ? Math.ceil((progress / duration) * 100) : 0;
  const videoUrl = `/courses/${videoData.course?.slug}?video=${videoData.video?._id}${showProgress ? `&progress=${progress}` : ""
    }`;
  const progressWidth = `${percentCompleted}%`;

  const formattedProgress = formatTime(progress);
  const formattedDuration = formatTime(duration);
  const borderStyleDecider = (index) => {
    let borderClass = ''
    if (index == 0) {
      borderClass = ' rounded-t-[10px] '
    }
    if (totalRecords - 1 === index) {
      borderClass += ' rounded-b-[10px] border-b '
    }
    return borderClass
  }
  return (
    <div className={`w-full ${borderStyleDecider(index)} p-4 border-l border-r border-t border-[#00000040]`}>
      <div className="flex items-center space-x-4">
        <Link href={videoUrl} className="relative sm:w-[160px] w-[110px]">
          <Image
            src={imageUrl}
            height={90}
            width={160}
            className="rounded-lg w-full sm:h-[90px] h-[70px] object-cover"
            alt="Video Thumbnail"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative z-10 h-6">
              <VideoPlayButtonIcon />
            </span>
          </div>

          {showProgress && (
            <div className="absolute bottom-0 left-0 w-full px-2 py-2 flex justify-between text-xs text-white items-center">
              <span className="px-1">{formattedProgress}</span>
              <div className="relative flex-1 bg-gray-200 rounded-full h-1">
                <div
                  className="absolute top-0 left-0 h-1 bg-purple-600 rounded-full"
                  style={{ width: progressWidth }}
                ></div>
              </div>
              <span className="px-1">{formattedDuration}</span>
            </div>
          )}
        </Link>

        <div className="flex justify-between w-full flex-1 sm:gap-0 gap-3">
          <div>
            <h3 className="font-bold text-black text-base md:text-lg lg:text-xl sm:line-clamp-none line-clamp-1">
              {title}
            </h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>

          <div className="flex items-center space-x-2">
            {!isFav && <GoStar className="text-gray-600 cursor-pointer text-[22px]" onClick={handleWatcherLaterClick} />}
            {isFav && <div className="!cursor-pointer" onClick={handleWatcherLaterClick} ><FavVideoStar /></div>}
            <button onClick={(e) => handleShare(e, videoUrl)}>
              <PiShareFatLight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
