"use client";
import { useState, useContext, useEffect } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { PiShareFatLight, PiVideo } from "react-icons/pi";
import UserCourseContext from "@/context/userCourse";
import UserContext from "@/context/user";
import useQueryParams from "@/hooks/useQueryParams";
import { trpc } from "@/utils/trpcClient";
import { cn } from "@/utils/classNames";
import { FaRegNoteSticky } from "react-icons/fa6";
import { handleShare } from '@/utils/share';
import { usePathname } from 'next/navigation';

const Sidebar = ({ setDisplaySidebar }) => {
  const params = useQueryParams();
  const pathname = usePathname();
  const segments = pathname.split("/");
  const quizSlug = params.get("q")
  const videoSlug = params.get("video")
  const {
    courseData,
    activeSections,
    setActiveSections,
    setQuizSection,
  } = useContext(UserCourseContext);

  const { user } = useContext(UserContext);

  const [watchedLater, setWatchedLater] = useState([]);

  const { mutate: createWatchLaterMutation } =
    trpc.userCourse.createWatchLater.useMutation();

  const { mutate: deleteWatchLaterMutation } =
    trpc.userCourse.deleteWatchLater.useMutation();

  const { data: watchLaterVideoData, error } =
    trpc.userCourse.getWatchLater.useQuery({
      user: user?._id,
      course: courseData._id,
    });

  const sections = courseData?.sections || [];

  const toggleSection = (sectionId) => {
    setActiveSections((prevActiveSections) =>
      prevActiveSections.includes(sectionId)
        ? prevActiveSections.filter((id) => id !== sectionId)
        : [...prevActiveSections, sectionId]
    );
  };

  useEffect(() => {
    if (watchLaterVideoData) {
      const videoIds = watchLaterVideoData?.map((item) => item?.video?._id);
      setWatchedLater(videoIds);
    }
  }, [watchLaterVideoData]);

  const handleVideoClick = (e, lesson) => {
    e.stopPropagation();
    if (!videoSlug || videoSlug !== lesson?._id) {
      params.delete("q");
      params.set("video", lesson._id);
      params.update();
      setDisplaySidebar && setDisplaySidebar(false)
    }
  };

  const handleWatcherLaterClick = (e, video, section) => {
    e.stopPropagation();
    const watchLaterPayload = {
      user: user._id,
      course: courseData._id,
      section: section._id,
      video: video._id,
    };

    if (!watchedLater.includes(video._id)) {
      createWatchLaterMutation(watchLaterPayload, {
        onSuccess: () => {
          setWatchedLater((prev) => [...prev, video._id]);
        },
        onError: () => {
          console.error("Error creating WatchLater document:", error);
        },
      });
    } else {
      deleteWatchLaterMutation(watchLaterPayload, {
        onSuccess: () => {
          setWatchedLater((prev) => prev.filter((id) => id !== video._id));
        },
        onError: () => {
          console.error("Error creating WatchLater document:", error);
        },
      });
    }
  };

  const handleQuizClick = (e, section) => {
    e.stopPropagation();
    if (!quizSlug) {
      params.delete("video");
      params.set("q", section?.quiz?._id);
      setQuizSection(section);
      params.update();
      setDisplaySidebar && setDisplaySidebar(false)
    }
  };
  const generateExactTime = (input) => {
    const hour = Math.floor(input / 60);
    const minute = input % 60;

    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };
  return (
    <div className="bg-white md:border-l-[#DDDDDD] md:border-[1px] md:overflow-y-auto col-span-1 md:h-[calc(100vh-100px)]">
      <div className="hidden md:block p-3 md:border-[1px] border-b-[#DDDDDD]">
        <h2 className="font-bold text-base 2xl:text-title-lg">Course Details</h2>
      </div>
      {sections.map((section, i) => {
        const isActive = activeSections.includes(section._id);
        const isQuizActive = quizSlug === section?.quiz?._id;
        return (
          <div
            key={section.id}
            className="border-b-[#DDDDDD] md:border-[1px] hover:cursor-pointer"
            onClick={() => toggleSection(section._id)}
          >
            <div className={`p-5 font-poppins ${isActive && "bg-[#A197EC52]"}`}>
              <div className="w-full flex justify-between items-center">
                <h3 className="font-[600] text-base 2xl:text-title-lg">
                  Section {i + 1}: {section.title}
                </h3>
              </div>
              <h5 className="space-x-3 text-para-base 2xl:text-base">
                <span>lessons: {section?.videos?.length}</span>
              </h5>
            </div>
            <div className={`section-content ${isActive ? "active" : ""}`}>
              {section.videos.map((lesson, index) => {
                const videoPlaying = lesson?._id === videoSlug;
                return (
                  <div
                    className={cn(
                      "p-3 2xl:p-5 font-poppins flex items-center space-x-4 hover:bg-[#cac5e952] border-y-[1px] relative"
                    )}
                    key={index}
                    onClick={(e) => handleVideoClick(e, lesson)}
                  >
                    {videoPlaying &&
                      <div
                        className="absolute h-full w-[6px] left-0 top-0 bg-primary z-[3]"
                        style={{
                          clipPath: "polygon(0px 0px, calc(100% - 6px) 0px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0px 100%)",
                        }}
                      />

                    }
                    <div className="w-32 h-20 flex-shrink-0 !ml-0">
                      <img
                        src={lesson?.thumbnail?.src}
                        alt={lesson.title}
                        className="aspect-video object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center mb-1 2xl:mb-3">
                        <h3 className="text-base 2xl:text-title-lg">{lesson.title}</h3>
                        <div className="flex items-center space-x-3 text-[18px] 2xl:text-[20px]">
                          <span
                            onClick={(e) => handleWatcherLaterClick(e, lesson, section)}
                          >
                            {watchedLater.includes(lesson?._id) ? (
                              <GoStarFill className="text-primary" />
                            ) : (
                              <GoStar />
                            )}
                          </span>
                          <button onClick={(e) => {
                            const videoUrl = `/courses/${segments[2]}?video=${lesson?._id}`
                            return handleShare(e, videoUrl)
                          }}>
                            <PiShareFatLight size={24} />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <PiVideo size={24} />
                        <span>{generateExactTime(lesson.duration)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {section?.quiz && (
                <div
                  className={cn(
                    "p-4 2xl:p-5 font-poppins hover:bg-[#cac5e952]",
                    isQuizActive && "border-l-[6px] border-primary"
                  )}
                  onClick={(e) => handleQuizClick(e, section)}
                >
                  <div className="flex w-full justify-between items-center mb-1 2xl:mb-3">
                    <h3 className="text-base 2xl:text-title-lg">
                      Quiz: {section?.quiz?.title}
                    </h3>
                    <span>
                      <FaRegNoteSticky size={20} />{" "}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
