"use client";
import { useContext, useMemo, useEffect, useState } from "react";
import Player from "@/components/CourseDetails/Player";
import OverViewTab from "@/components/CourseDetails/VideoTabs/OverViewTab";
import UserCourseContext from "@/context/userCourse";
import useQueryParams from "@/hooks/useQueryParams";
import UserContext from "@/context/user";
import { trpc } from "@/utils/trpcClient";
import VideoCardSkeleton from '@/components/Profile/VideoCardSkeleton';
import { UnPaidContent } from '../UnPaidContent';

const PlayerSetup = ({ currentVideoData }) => {
    const { courseData, setActiveSections, setCurrentVideoData, setQuizSection } = useContext(UserCourseContext);
    const { user } = useContext(UserContext);
    const [hasAccess, setHasAccess] = useState(false);
    const params = useQueryParams();
    const videoSlug = params.get("video");
    const quizSlug = params.get("q");
    const { isTrial } = currentVideoData || {};

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
    console.log({ currentVideoData })
    return (
        <>
            {isLoading ? (
                <VideoCardSkeleton />
            ) :
                isTrial ? (
                    <>
                        <Player handleVideoClick={handleNextStep} currentVideoData={currentVideoData} />
                        <OverViewTab currentVideoData={currentVideoData} />
                    </>
                ) : (
                    <UnPaidContent />
                )}

        </>
    );
};


export default PlayerSetup;
