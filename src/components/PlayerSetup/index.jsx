"use client";
import { useContext, useMemo, useEffect, useState } from "react";
import Player from "@/components/CourseDetails/Player";
import OverViewTab from "@/components/CourseDetails/VideoTabs/OverViewTab";
import UserCourseContext from "@/context/userCourse";
import useQueryParams from "@/hooks/useQueryParams";
import Quiz from "@/components/CourseDetails/Quiz";
import UserContext from "@/context/user";
import { trpc } from "@/utils/trpcClient";
import Modal from "@/components/UI/Modal";
import Link from "next/link";
import Confetti from 'react-confetti'
import VideoCardSkeleton from '@/components/Profile/VideoCardSkeleton';


const PlayerSetup = () => {
    const { courseData, setActiveSections, setCurrentVideoData, setQuizSection } =
        useContext(UserCourseContext);
    const { user, updateUser } = useContext(UserContext);
    const [hasAccess, setHasAccess] = useState(false);
    const [isShowBadgeModal, setBadgeModal] = useState(false);
    const [awardedBadge, setAwardedBadge] = useState(null);
    const params = useQueryParams();
    const videoSlug = params.get("video");
    const quizSlug = params.get("q");

    const getVideoAndSection = (videoSlug, courseData) => {
        if (videoSlug) {
            const section = courseData.sections?.find((section) =>
                section.videos.some((video) => video._id === videoSlug)
            );
            if (section) {
                const video = section.videos.find((video) => video._id === videoSlug);
                return { video, sectionId: section._id };
            }
        } else {
            if (courseData.sections?.length > 0) {
                const firstSection = courseData.sections[0];
                if (firstSection.videos.length > 0) {
                    const firstVideo = firstSection.videos[0];
                    if (!quizSlug) {
                        params.set("video", firstVideo._id);
                        params.update();
                    }
                    return { video: firstVideo, sectionId: firstSection._id };
                }
            }
        }
        return { video: null, sectionId: null };
    };

    const getQuizAndSection = (quizSlug, courseData) => {
        if (quizSlug) {
            const section = courseData.sections?.find(
                (section) => section.quiz && section.quiz._id === quizSlug
            );
            if (section) {
                return { quiz: section.quiz, sectionId: section._id };
            }
        }
        return { quiz: null, sectionId: null };
    };

    const { video, sectionId: videoSectionId } = useMemo(
        () => getVideoAndSection(videoSlug, courseData),
        [videoSlug, courseData]
    );

    const { quiz, sectionId: quizSectionId } = useMemo(
        () => getQuizAndSection(quizSlug, courseData),
        [quizSlug, courseData]
    );
    const {
        data: userData,
        isLoading,
    } = trpc.user.get.useQuery({
        _id: user?._id,
    });

    const handleNextStep = () => {
        const videoId = params.get("video") ?? "";

        const currentSectionIndex = courseData.sections.findIndex((section) =>
            section.videos.some((video) => video._id === videoId)
        );

        if (currentSectionIndex === -1) return;

        const currentSection = courseData.sections[currentSectionIndex];
        const currentVideoIndex = currentSection.videos.findIndex(video => video._id === videoId);

        if (currentVideoIndex !== -1 && currentVideoIndex + 1 < currentSection.videos.length) {
            const nextVideoId = currentSection.videos[currentVideoIndex + 1]._id;
            params.set("video", nextVideoId);
            params.delete("q");
            params.update();
            return;
        }
        if (currentSection.quiz?._id) {
            params.set("q", currentSection.quiz._id);
            params.delete("video");
            params.update();
            return;
        }
        const nextSection = courseData.sections[currentSectionIndex + 1];
        if (nextSection?.videos.length > 0) {
            const firstVideoId = nextSection.videos[0]._id;
            params.set("video", firstVideoId);
            params.delete("q");
            params.update();
            return;
        }
    };

    useEffect(() => {
        if (userData?.subscribedPlans) {
            const premiumPlan = userData.subscribedPlans.some(
                (plan) => plan.plan.title === "🏢 PREMIUM PLAN"
            );

            if (premiumPlan) {
                setHasAccess(true);
            } else {
                const standardPlan = userData.subscribedPlans.find(
                    (plan) =>
                        plan.plan.title === "🚀  STANDARD PLAN" &&
                        plan.course?.slug === courseData.slug
                );
                setHasAccess(!!standardPlan);
            }
        }
    }, [userData, courseData]);


    useEffect(() => {
        if (quiz) {
            setQuizSection(quiz);
            setActiveSections((prev) => [...prev, quizSectionId]);
        } else if (video) {
            setCurrentVideoData(video);
            setActiveSections((prev) => [...prev, videoSectionId]);
        }
    }, [quiz, video, quizSectionId, videoSectionId]);


    const isFreeTrialVideo = useMemo(() => {
        for (const section of courseData?.sections) {
            const video = section.videos.find((video) => video._id === videoSlug);
            if (video) {
                return video?.isTrial;
            }
        }
        return false;
    }, [courseData, videoSlug]);

    return (
        <>
            {(isShowBadgeModal) &&
                <Confetti
                    style={{ zIndex: 1000 }}
                    width={window.outerWidth - 20}
                />
            }
            {isLoading ? (
                <VideoCardSkeleton />
            ) : isFreeTrialVideo || hasAccess ? (
                quizSlug ? (
                    <Quiz />
                ) : (
                    <>
                        <Player handleVideoClick={handleNextStep} />
                        <OverViewTab />
                    </>
                )
            ) : (
                <div className="flex flex-col justify-center items-center h-[80vh] text-center space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        You don&apos;t have access to this course
                    </h1>
                    <p className="text-gray-600">
                        Purchase this course to unlock all the content and start learning
                        today.
                    </p>
                    <Link
                        href={"/#plan"}
                        scroll={true}
                        className="px-6 py-3 bg-[#491a8b] text-white rounded-xl hover:bg-purple-700 transition-all duration-300"
                    >
                        Buy Now
                    </Link>
                </div>
            )}
            <Modal open={isShowBadgeModal} title={`🎉 Congratulations! 🎉 you won ${awardedBadge?.title} badge.`} onClose={() => setBadgeModal(false)}>
                <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-gradient-to-b from-purple-600 to-indigo-800 rounded-lg shadow-lg text-white">
                    <h2 className="text-2xl font-semibold text-center">{awardedBadge?.title}</h2>
                    <div className="relative">
                        <div className="absolute -inset-2 bg-purple-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                        <img
                            src={awardedBadge?.image?.src}
                            alt={`${awardedBadge?.title} badge`}
                            className="h-[120px] w-[120px] rounded-full shadow-lg border-4 border-white"
                        />
                    </div>
                    <p className="text-center text-lg px-4">
                        {awardedBadge?.description}
                    </p>
                    <button
                        onClick={() => setBadgeModal(false)}
                        className="px-6 py-2 mt-4 font-medium text-purple-700 bg-white rounded-full shadow-md hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
                    >
                        Close
                    </button>
                </div>
            </Modal>

        </>
    );
};

export default PlayerSetup;
