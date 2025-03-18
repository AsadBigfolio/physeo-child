"use client";
import React, { useState, useRef, useEffect } from "react";

const VideoModal = ({ videoUrl = "/banner-vedios/hero_vid (720p).mp4" }) => {
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;
      if (videoRef.current) videoRef.current.muted = newMuteState;
      return newMuteState;
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="relative w-full">
      <video
        ref={videoRef}
        src={videoUrl} 
        width="100%"
        loop
        autoPlay
        muted={isMuted} 
        type="video/mp4"
        className="z-[1] rounded-[10px]"
      />

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-5 md:right-[25px] bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full border-none cursor-pointer z-20"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
};

export default VideoModal;
