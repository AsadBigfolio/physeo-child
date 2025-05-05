"use client";
import { useState, useContext, useEffect } from "react";
import UserCourseContext from "@/context/userCourse";
import UserContext from "@/context/user";
import useQueryParams from "@/hooks/useQueryParams";
import { trpc } from "@/utils/trpcClient";
import { cn } from "@/utils/classNames";
import { handleShare } from '@/utils/share';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import Image from 'next/image';


const Sidebar = ({ setDisplaySidebar }) => {
  const params = useQueryParams();
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
    const videoId = params.get("video");
    if (sections.length && videoId) {
      for (const section of sections) {
        if (section.videos.map(item => item._id).includes(videoId)) {
          setActiveSections([...activeSections, section?._id]);
          break;
        }
      }
    }
  }, [sections, params.get("video")]);

  useEffect(() => {
    if (watchLaterVideoData) {
      const videoIds = watchLaterVideoData?.map((item) => item?.video?._id);
      setWatchedLater(videoIds);
    }
  }, [watchLaterVideoData]);

  const handleWatcherLaterClick = (e, video, section) => {
    e.stopPropagation();
    const watchLaterPayload = {
      user: user._id,
      course: courseData._id,
      section: '67dd0d496ace043dedfffa9d',
      video: '67dd0d496ace043dedfffa99',
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
    params.delete("video");
    params.set("q", section?.quiz);
    setQuizSection(section);
    params.update();
    setDisplaySidebar && setDisplaySidebar(false)

  };
  const generateExactTime = (input) => {
    const hour = Math.floor(input / 60);
    const minute = input % 60;

    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white p-[12px] rounded-[8px] h-[82vh] overflow-y-auto">
      <div className="w-full overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[20px] font-semibold text-mainText">{sections?.length} modules</h1>
          <span className="text-sm font-medium text-primary-muted">1h 37m</span>
        </div>

        {sections.map((section) => {
          const isActive = activeSections.includes(section._id);
          return (
            <div key={section._id} className="transition-all duration-300 ease-in-out mt-2 border border-[#E4ECF2] rounded-[8px]">
              <div
                onClick={() => toggleSection(section._id)}
                className={cn(
                  "p-[12px] flex justify-between items-center cursor-pointer bg-[#EFF4F8] transition-colors duration-200",
                  isActive ? "rounded-t-[8px] hover:bg-[#E0E8F0]" : "rounded-[8px] hover:bg-[#E0E8F0]"
                )}
              >
                <div className="transition-all duration-200 ease-in-out">
                  <h2 className={cn(
                    "font-medium transition-all duration-200 ease-in-out",
                    isActive ? "text-primary-muted text-[14px]" : "text-mainText text-[16px]"
                  )}>
                    {section?.title}
                  </h2>
                  {!isActive && (
                    <p className="text-sm text-primary-muted transition-opacity duration-200 ease-in-out">
                      {section?.videos?.length} Lessons
                    </p>
                  )}
                </div>
                {isActive ? (
                  <ChevronUpIcon className="w-5 h-5 text-mainText transition-transform duration-300 ease-in-out" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-mainText transition-transform duration-300 ease-in-out" />
                )}
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out bg-white",
                  isActive ? "max-h-[1000px] rounded-b-[8px]" : "max-h-0"
                )}
                style={{
                  transitionProperty: 'max-height, border-radius',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {isActive &&
                  section?.videos?.map((lesson, index) => {
                    const videoPlaying = lesson?._id === videoSlug;
                    const progress = lesson?.progress || 80;

                    return (
                      <Link
                        href={`?video=${lesson?._id}`}
                        key={lesson._id}
                        className={cn(
                          "block group transition-all duration-200 ease-in-out",
                          videoPlaying ? "!bg-blue-100" : "hover:bg-slate-100",
                          "bg-[#EFF4F8]"
                        )}
                      >
                        <div className={`flex items-center gap-3 p-[12px] relative transition-colors duration-150 ease-in-out ${section?.videos?.length - 1 !== index ? "border-b border-b-[#E4ECF2]" : ""}`}>
                          <div className="relative shrink-0 transition-transform duration-200 ease-in-out group-hover:scale-[1.02]">
                            <Image
                              src={lesson?.thumbnail?.src}
                              alt={lesson.name}
                              height={60}
                              width={94}
                              className="object-cover h-[60px] rounded-[6px] transition-all duration-300 ease-in-out"
                            />
                            {true && (
                              <div className="absolute bottom-[7px] right-[2px] bg-black bg-opacity-60 text-white text-[12px] font-medium px-1.5 py-0.5 rounded transition-opacity duration-200 ease-in-out">
                                01:03
                              </div>
                              )}
                            {/* Progress bar */}
                            <div className="absolute bottom-0 left-0 h-[5px] w-full bg-gray-300 rounded-b-md overflow-hidden transition-all duration-500 ease-in-out">
                                <div
                                className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                                style={{ width: `${progress}%` }}
                                />
                            </div>
                          </div>

                          <div className="flex-1 transition-all duration-200 ease-in-out">
                            <h3
                              className={cn(
                                "text-[16px] font-medium transition-all duration-150 ease-in-out",
                                videoPlaying ? "text-primary" : "text-mainText group-hover:text-primary-muted"
                              )}
                            >
                              {lesson.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
