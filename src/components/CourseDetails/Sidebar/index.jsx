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
import Link from 'next/link';
import { FiBookOpen, FiChevronDown, FiPlay, FiShare2, FiClock } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { BsFileText, BsCheckCircle } from 'react-icons/bs';
import { RiQuillPenLine } from 'react-icons/ri';


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
    <div className=" md:overflow-y-auto col-span-1 md:h-[calc(100vh-100px)] shadow-lg rounded-lg overflow-hidden">
      {/* Header with subtle gradient */}
      <div className="hidden md:block p-4 border-b border-gray-100 sticky top-0 bg-gradient-to-r from-indigo-50 to-white z-10">
        <h2 className="font-bold text-lg 2xl:text-xl text-gray-800 flex items-center">
          <RiQuillPenLine className="w-5 h-5 mr-2 text-black" />
          <span>
            Course Modules
          </span>
        </h2>
      </div>

      {/* Sections with smooth accordion */}
      <div className="divide-y divide-gray-100">
      {sections.map((section, i) => {
        const isActive = activeSections.includes(section._id);
        const isQuizActive = quizSlug === section?.quiz?._id;

        return (
          <div
            key={section.id}
            className="transition-all duration-300 hover:bg-gray-50/50"
          >
            {/* Section Header with animated chevron */}
            <div
              className={`p-4 flex justify-between items-center cursor-pointer group ${isActive ? "bg-indigo-50/50" : ""}`}
              onClick={() => toggleSection(section._id)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-indigo-100 rotate-0" : "bg-gray-100 -rotate-90"} group-hover:bg-indigo-100`}>
                  <FiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-indigo-600" : "text-gray-500"}`}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900  group-hover:text-indigo-700 transition-colors">
                    <span className="text-primary">Sub Module {i + 1}:</span> {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <span className="inline-flex items-center mr-3">
                      {/* <FiClock className="mr-1 w-3 h-3" />
                      {calculateTotalDuration(section.videos)} */}
                    </span>
                    <span className="inline-flex items-center">
                      <FiPlay className="mr-1 w-3 h-3" />
                      {section?.videos?.length} lessons
                    </span>
                  </p>
                </div>
              </div>
              {section?.quiz && (
                <span className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs px-2.5 py-1 rounded-full border border-purple-200 shadow-sm">
                  <BsFileText className="inline mr-1" />
                  Quiz
                </span>
              )}
            </div>

            {/* Lessons with animated entrance */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-[2000px]" : "max-h-0"}`}>
              {section.videos.map((lesson, index) => {
                const videoPlaying = lesson?._id === videoSlug;
                const isWatchedLater = watchedLater.includes(lesson?._id);
                const isCompleted = lesson.progress === 100;

                return (
                  <Link
                    className={cn(
                      "block px-4 py-3 hover:bg-indigo-50/50 border-t border-gray-100 transition-all duration-200 relative group",
                      videoPlaying && "bg-gradient-to-r from-indigo-50/80 to-white border-l-4 border-l-indigo-600",
                      isCompleted && "hover:bg-green-50/50"
                    )}
                    key={index}
                    href={`/courses/${'ssdsdsdhv-sdsdsds'}?video=${lesson?._id}`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Thumbnail with multiple states */}
                      <div className="relative flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden shadow-sm border border-gray-200 group-hover:border-indigo-200 transition-all">
                        <img
                          src={lesson?.thumbnail?.src}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {videoPlaying && (
                          <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                            <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow-md animate-pulse">
                              <FiPlay className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                        {true && (
                          <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5 shadow-sm">
                            <BsCheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className={`text-sm font-medium ${videoPlaying ? "text-indigo-700" : "text-gray-900"} ${isCompleted ? "line-through decoration-green-500" : ""} truncate`}>
                            {lesson.title}
                          </h3>
                          <div className="flex space-x-2 ml-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleWatcherLaterClick(e, lesson, section);
                              }}
                              className="text-gray-400 hover:text-yellow-500 transition-colors transform hover:scale-110"
                              aria-label={isWatchedLater ? "Remove from watch later" : "Add to watch later"}
                            >
                              {isWatchedLater ? (
                                <FaStar className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-bounce" />
                              ) : (
                                <FaRegStar className="w-4 h-4 group-hover:fill-yellow-500" />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleShare(e, `/courses/${courseSlug}?video=${lesson?._id}`);
                              }}
                              className="text-gray-400 hover:text-indigo-600 transition-colors transform hover:scale-110"
                              aria-label="Share lesson"
                            >
                              <FiShare2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                          <FiClock className="w-3 h-3 flex-shrink-0" />
                          <span>{generateExactTime(lesson.duration)}</span>
                          {lesson.progress > 0 && (
                            <>
                              <span>•</span>
                              <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${lesson.progress === 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                                  style={{ width: `${lesson.progress}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-gray-400">
                                {lesson.progress}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* Quiz with enhanced design */}
              {section?.quiz && (
                <div
                  className={cn(
                    "px-4 py-3 hover:bg-purple-50/50 cursor-pointer transition-all border-t border-gray-100 group",
                    isQuizActive && "bg-gradient-to-r from-purple-50/80 to-white border-l-4 border-l-purple-600"
                  )}
                  onClick={(e) => handleQuizClick(e, section)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shadow-inner border border-purple-200">
                      <BsFileText className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className={`text-sm font-medium ${isQuizActive ? "text-purple-700" : "text-gray-900"}`}>
                        {section?.quiz?.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center">
                        <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-[0.7rem] mr-2">
                          Knowledge Check
                        </span>
                        {section.quiz.questions?.length || 0} questions
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default Sidebar;
