"use client";
import { useContext, useRef, useEffect, useState } from "react";
import UserCourseContext from "@/context/userCourse";
import ReactPlayer from "react-player";
import UserContext from "@/context/user";
import useQueryParams from "@/hooks/useQueryParams";
import { trpc } from "@/utils/trpcClient";
import { FaPlay } from "react-icons/fa";

const Player = ({ handleVideoClick, handleSectionBaseModal }) => {
  const params = useQueryParams();
  const { currentVideoData, courseData } = useContext(UserCourseContext);
  const { user } = useContext(UserContext);
  const progress = params.get("progress");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);

  const { mutate: addWatchHistory } = trpc.userCourse.createOrUpdateWatchHistory.useMutation({
    onSuccess: (data) => {
      console.log({ data })
      if (data?.badge) {
        handleSectionBaseModal(data?.badge)
      }
    }
  });

  const progressRef = useRef(0);
  const durationRef = useRef(0);
  const playerRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleWatchHistory = (isVideoEnd = false) => {
    if (videoEnded && !isVideoEnd) return;

    const historyPayload = {
      user: user?._id,
      video: currentVideoData?._id,
      course: courseData?._id,
      progress: isVideoEnd ? durationRef.current : Math.floor(progressRef.current),
      totalLength: durationRef.current,
    };
    // if (historyPayload.progress < 1) {
    //   return
    // }
    addWatchHistory(historyPayload);
    if (isVideoEnd) {
      setVideoEnded(true);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleWatchHistory();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleWatchHistory();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentVideoData, courseData, user]);

  const handlePlayerProgress = () => {
    if (playerRef.current && progress) {
      playerRef.current.seekTo(parseFloat(progress), "seconds");
    }
  };

  useEffect(() => {
    const thumbnailUrl = currentVideoData?.thumbnail?.src;
    if (thumbnailUrl) {
      setThumbnailImage(encodeURI(thumbnailUrl));
    }
  }, [currentVideoData]);

  return (
    <div className="video-wrapper w-full h-0 relative pt-[56%]">
      {showPlayer ? (
        <ReactPlayer
          width="100%"
          height="100%"
          ref={playerRef}
          key={currentVideoData?._id}
          controls
          startTime={progress || 0}
          url={currentVideoData?.url}
          playing={true}
          onReady={handlePlayerProgress}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
          progressInterval={10000}
          onProgress={(progress) => {
            if (!videoEnded) {
              progressRef.current = progress.playedSeconds;
            }
          }}
          onEnded={() => {
            handleWatchHistory(true);
            handleVideoClick && handleVideoClick();
          }}
          onDuration={(duration) => {
            durationRef.current = duration;
          }}
        />
      ) : (
          <div
            onClick={() => setShowPlayer(true)}
            className='size-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'
          >
            <img
              src={thumbnailImage}
              alt="Video Thumbnail"
              className="size-full cursor-pointer object-cover"
              style={{ width: '100%', height: '100%' }}
            />
            <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]'>
              <FaPlay className='text-white text-2xl' />
            </button>
          </div>
      )}
    </div>
  );
};

export default Player;
