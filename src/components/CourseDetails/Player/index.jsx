"use client";
import { useContext, useRef, useEffect, useState } from "react";
import UserCourseContext from "@/context/userCourse";
import ReactPlayer from "react-player";
import UserContext from "@/context/user";
import useQueryParams from "@/hooks/useQueryParams";
import { trpc } from "@/utils/trpcClient";

const Player = ({ handleVideoClick, handleSectionBaseModal, currentVideoData }) => {
  const params = useQueryParams();
  const { courseData } = useContext(UserCourseContext);
  const { user } = useContext(UserContext);
  const progress = params.get("progress");

  const { mutate: addWatchHistory } = trpc.userCourse.createOrUpdateWatchHistory.useMutation({
    onSuccess: (data) => {
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

  return (
    <div className="video-wrapper w-[910px]  h-[514px] relative pt-[56%]">
        <ReactPlayer
          width="100%"
          height="100%"
          ref={playerRef}
          key={currentVideoData?._id}
          controls
          startTime={progress || 0}
          url={currentVideoData?.videoUrl}
          // playing={true}
          onReady={handlePlayerProgress}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
        light={currentVideoData?.thumbnail?.src}
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
    </div>
  );
};

export default Player;
