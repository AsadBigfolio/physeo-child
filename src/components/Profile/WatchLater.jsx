"use client"
import React, { useContext } from "react";
import VideoCard from "./VideoCard";
import UserContext from "@/context/user";
import { useRouter } from 'next/navigation';
import { trpc } from '@/utils/trpcClient';

const WatchLater = () => {
  const { userData } = useContext(UserContext)
  const { watchLaters } = userData
  const router = useRouter();
  const { mutate: createWatchLaterMutation } =
    trpc.userCourse.createWatchLater.useMutation();
  const { mutate: deleteWatchLaterMutation } =
    trpc.userCourse.deleteWatchLater.useMutation();
  const handleWatcherLaterClick = (e) => {
    const watchLaterPayload = {
      user: userData?.user._id,
      course: e?.course?._id,
      section: e?.video?.section,
      video: e?.video?._id,
    };
    const watchLatersIds = watchLaters?.map((item) => item?.video?._id)
    if (!watchLatersIds.includes(e?.video._id)) {
      createWatchLaterMutation(watchLaterPayload, {
        onSuccess: () => {
          router.refresh()
        },
        onError: () => {
          console.error("Error creating WatchLater document:", error);
        },
      });
    } else {
      deleteWatchLaterMutation(watchLaterPayload, {
        onSuccess: () => {
          router.refresh()
        },
        onError: () => {
          console.error("Error creating WatchLater document:", error);
        },
      });
    }
  };
  return (
    <>
      {userData?.watchLaters?.length > 0 && (
        <div className="flex flex-col mb-[80px] 2xl:mb-[100px]">
          <div >
            {userData?.watchLaters?.map((video, index) => (
              <VideoCard
                key={video.id}
                imageUrl={video?.video?.thumbnail?.src || "/watch1.png"}
                title={video.video?.title}
                description={video.course?.title}
                duration={video.totalLength}
                progress={video.progress}
                showProgress={true}
                videoData={video}
                index={index}
                totalRecords={userData?.watchLaters?.length ?? 0}
                handleWatcherLaterClick={() => handleWatcherLaterClick(video)}
                isFav={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchLater;
