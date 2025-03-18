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
import Button from "@/components/UI/Button";
import Link from "next/link";
import Confetti from 'react-confetti'
import VideoCardSkeleton from '@/components/Profile/VideoCardSkeleton';
const courses = [
  { name: 'Conspiracy', src: '/certificate/Conspiracy.jpg' },
  { name: 'Cryptozoology', src: '/certificate/Cryptozoology.jpg' },
  { name: 'Magicology', src: '/certificate/Magicology.jpg' },
  { name: 'Paranormal', src: '/certificate/Paranormal.jpg' },
  { name: 'Phenomenology', src: '/certificate/Phenomenology.jpg' },
  { name: 'Ufology', src: '/certificate/Ufology.jpg' },
  { name: 'Unexplained', src: '/certificate/Unexplained.jpg' },
];

const Course = () => {
  const { courseData, setActiveSections, setCurrentVideoData, setQuizSection } =
    useContext(UserCourseContext);
  const { mutateAsync, isPending: updateCertificateLoading } = trpc.user.updateUserCertificates.useMutation();
  const { user, updateUser } = useContext(UserContext);
  const [hasAccess, setHasAccess] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
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

  const { data: watchHistoryData, mutate: checkCourseStatus, isPending } = trpc.userCourse.checkCourseComplete.useMutation({
    onSuccess: (data) => {
      if (data) {
        assignCertificate();
      }
    },
  });

  const assignCertificate = async () => {
    try {
      if (!user?.certificates.includes(courseData?.title)) {
        await mutateAsync({ userId: user?._id, certificate: courseData?.title });
        updateUser({ ...user, certificates: [...user.certificates, courseData?.title] })
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsCourseComplete = () => {
    if (!user?.certificates.includes(courseData?.title)) {
      checkCourseStatus({ courseId: courseData?._id, user: user?._id });
    }
  };
  const handleSectionBaseModal = (badgeData) => {
    if (badgeData) {
      setBadgeModal(true)
      setAwardedBadge(badgeData)
    }
  }
  useEffect(() => {
    if (courseData && user) {
      checkIsCourseComplete();
    }
  }, [videoSlug, quizSlug]);

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


  const handleCertificateRedirect = () => {
    window.open(`/certificate/${courseData?.title}`);
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

  const courseRelatedCertificate = () => {
    const certificate = courses.find((item) => item.name.toLowerCase() === courseData?.title.toLowerCase())
    return certificate?.src ?? ''
  }

  useEffect(() => {
    if (quiz) {
      setQuizSection(quiz);
      setActiveSections((prev) => [...prev, quizSectionId]);
    } else if (video) {
      setCurrentVideoData(video);
      setActiveSections((prev) => [...prev, videoSectionId]);
    }
  }, [quiz, video, quizSectionId, videoSectionId]);

  const closeModal = () => setShowModal(false);

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
      {(isShowModal || isShowBadgeModal) &&
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
                <Player handleVideoClick={handleNextStep} handleSectionBaseModal={handleSectionBaseModal} />
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
      <Modal open={isShowModal} title="Certificate" onClose={closeModal}>
        <div className="flex flex-col items-center justify-center p-4 text-center relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Course Completed!
          </h2>
          <p className="text-gray-600 mb-6">
            Congratulations on completing the course. You can now download your
            certificate.
          </p>
          <div className="p-2">
            <img src={courseRelatedCertificate()} alt="Certificate" />
          </div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h2 class="text-black text-[3vw] mt-12 font-[Avalen]">
              {userData?.userName ?? ''}
            </h2>
          </div>

          <div className="flex space-x-4">
            <Button onClick={handleCertificateRedirect}>Get Certificate</Button>
            <Button onClick={closeModal} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </Modal>
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

export default Course;
