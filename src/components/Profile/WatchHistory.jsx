"use client"
import { useContext, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import UserContext from "@/context/user";
import { trpc } from "@/utils/trpcClient";

const WatchHistory = () => {
  const { userData } = useContext(UserContext)
  const [favVideosIds, setFavVideosIds] = useState([])
  const { watchLaters } = userData

  const { mutate: createWatchLaterMutation } = trpc.userCourse.createWatchLater.useMutation();
  const { mutate: deleteWatchLaterMutation } = trpc.userCourse.deleteWatchLater.useMutation();

  const handleWatcherLaterClick = (e) => {
    const watchLaterPayload = {
      user: userData?.user._id,
      course: e?.course?._id,
      section: e?.video?.section,
      video: e?.video._id,
    };
    if (!favVideosIds.includes(e?.video._id)) {

      createWatchLaterMutation(watchLaterPayload, {
        onSuccess: () => {
          const dataCopy = [...favVideosIds]
          dataCopy.push(e?.video._id)
          setFavVideosIds(dataCopy)
        },
        onError: () => {
          console.error("Error creating WatchLater document:", error);
        },
      });
    } else {
      deleteWatchLaterMutation(watchLaterPayload, {
        onSuccess: () => {
          const dataCopy = favVideosIds.filter((id) => id !== e?.video._id)
          setFavVideosIds(dataCopy)
        },
        onError: () => {
          console.error("Error creating WatchLater document:", error);
        },
      });
    }
  };
  const isFav = (videoId) => {
    return favVideosIds.includes(videoId)
  }
  useEffect(() => {
    const watchLatersIds = watchLaters?.map((item) => item?.video?._id)
    setFavVideosIds(watchLatersIds)
  }, [watchLaters])

  return (
    <>
      {userData?.watchHistories?.length > 0 && (
        <div className="w-full flex flex-col mb-[50px] 2xl:mb-[100px]">
          <div >
            {userData?.watchHistories?.map((history, index) => (
              <VideoCard
                key={history.id}
                imageUrl={history?.video?.thumbnail?.src || "/watch1.png"}
                title={history?.video?.title}
                description={history.course?.title}
                duration={history?.video?.duration}
                progress={history.progress}
                showProgress={true}
                videoData={history}
                index={index}
                totalRecords={userData?.watchHistories?.length ?? 0}
                handleWatcherLaterClick={() => handleWatcherLaterClick(history)}
                isFav={isFav(history?.video?._id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WatchHistory;
