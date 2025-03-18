"use client";
import { useContext, useState, useRef } from "react";
import UserCourseContext from "@/context/userCourse";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "@/components/UI/Modal";
import { trpc } from '@/utils/trpcClient';
import UserContext from '@/context/user';
import useQueryParams from '@/hooks/useQueryParams';
import Button from '@/components/UI/Button';

const Quiz = () => {
  const params = useQueryParams();
  const { quizSection, courseData } = useContext(UserCourseContext);
  const { user } = useContext(UserContext)
  const [selectedOptions, setSelectedOptions] = useState({});
  const [checked, setChecked] = useState({});
  const [canGoNext, setCanGoNext] = useState(false);
  const [error, setError] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [explanation, setExplanation] = useState("");
  const sliderRef = useRef(null);
  const { mutate, isPending: quizCompleteLoading } = trpc.user.updateQuizAttempt.useMutation()

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    arrows: false,
    swipe: false,
    touchMove: false,
  };
  const updateAttemptQuizCounter = () => {
    const quizId = params.get('q') ?? '';
    mutate({ userId: user?._id, quizId })
  }
  const handleOptionSelect = (mcqIndex, optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [mcqIndex]: optionIndex,
    });
  };

  const handleCheckAnswer = (mcqIndex) => {
    if (selectedOptions[mcqIndex] === undefined) {
      setError("Please select an option before checking the answer.");
      return;
    }

    setError(null);
    const selectedOption = selectedOptions[mcqIndex];
    const correctOption = parseInt(quizSection?.mcqs[mcqIndex]?.correctOption);
    const isCorrect = selectedOption === correctOption;

    setChecked({
      ...checked,
      [mcqIndex]: {
        isCorrect,
        selectedOption,
        correctOption,
      },
    });

    setCanGoNext(isCorrect);
  };

  const getOptionClassName = (mcqIndex, optionIndex) => {
    const optionStatus = checked[mcqIndex];
    const correctOption = quizSection?.mcqs[mcqIndex]?.correctOption;

    if (!optionStatus) {
      return "";
    }

    if (optionStatus.selectedOption === optionIndex) {
      return optionStatus.isCorrect
        ? "text-green-500 border-green-500"
        : "text-red-500 border-red-500";
    }

    if (parseInt(correctOption) === optionIndex) {
      return "text-green-500 border-green-500";
    }

    return "";
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCanGoNext(false);
    }
  };

  const handlePrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      const currentSlide = sliderRef.current.innerSlider.state.currentSlide;
      if (checked[currentSlide - 1]) {
        setCanGoNext(true);
      }
    }
  };

  const handleModalClick = (mcq) => {
    setExplanation(mcq.explanation);
    setDisplayModal(true);
  };

  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  const handleVideoClick = () => {
    updateAttemptQuizCounter()
    const quizId = params.get('q') ?? '';

    let currentSectionsIndex = courseData.sections.findIndex((item) => {
      return item.quiz._id === quizId;
    });

    if (currentSectionsIndex === -1) return;

    currentSectionsIndex = (currentSectionsIndex + 1) % courseData.sections.length;

    const nextSection = courseData?.sections[currentSectionsIndex];

    if (!nextSection.videos?.length) return;

    const nextVideoId = nextSection.videos[0]?._id;


    params.delete("q");
    params.set("video", nextVideoId);
    params.update();
  };


  return (
    <div className="lg:py-[50px] py-[30px] px-[20px] lg:px-[160px] font-poppins">
      <div className="flex flex-col">
        <h1 className="text-primary text-[46px] font-bold">QUIZ</h1>
        <p className="text-[24px] mb-[40px]">
          Section - <span className="font-semibold">{quizSection?.title}</span>
        </p>
      </div>
      <div className="h-full bg-white">
        <Slider {...settings} ref={sliderRef}>
          {quizSection?.mcqs?.map((mcq, mcqIndex) => (
            <div className="text-[#666666]" key={mcqIndex}>
              <div className="mb-5">
                <p className="text-primary text-para-lg font-bold">
                  Question {mcqIndex + 1}
                </p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: mcq?.title,
                  }}
                  className="pt-1"
                ></div>
              </div>
              <div className="w-full border-border border-[1px] rounded-[10px] px-8">
                {mcq?.options?.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    onClick={() => handleOptionSelect(mcqIndex, optionIndex)}
                    className={`flex text-base gap-x-2 items-center cursor-pointer border-b-[1px] py-7 ${getOptionClassName(
                      mcqIndex,
                      optionIndex
                    )}`}
                  >
                    <span className={`text-[#666666] font-semibold`}>
                      ({alphabet[optionIndex]})
                    </span>
                    <div className="rounded-full flex items-center justify-center border-[1px] border-[#666666] h-7 w-7">
                      <span
                        className={`w-5 h-5 rounded-full ${selectedOptions[mcqIndex] === optionIndex
                          ? "bg-primary border-primary"
                          : "border-gray-500"
                          }`}
                      ></span>
                    </div>
                    <span
                      className={`flex-1 ${selectedOptions[mcqIndex] === optionIndex
                        ? "text-primary"
                        : ""
                        }`}
                    >
                      {option.option}
                    </span>
                  </div>
                ))}
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={handlePrevious}
                    className={`py-2 px-4 rounded-lg ${mcqIndex === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-secondary text-white"
                      }`}
                    disabled={mcqIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handleModalClick(mcq)}
                    className={`py-2 px-4 bg-primary text-white rounded-lg`}
                  >
                    Explanation
                  </button>
                </div>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() => handleCheckAnswer(mcqIndex)}
                    className="py-2 px-4 bg-primary text-white rounded-lg"
                  >
                    Check
                  </button>
                  {!(mcqIndex === quizSection?.mcqs?.length - 1) ? <button
                    onClick={handleNext}
                    className={`py-2 px-4 rounded-lg ${!canGoNext || mcqIndex === quizSection?.mcqs?.length - 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-primary text-white"
                      }`}
                    disabled={
                      !canGoNext || mcqIndex === quizSection?.mcqs?.length - 1
                    }
                  >
                    Next
                  </button>
                    :
                    <Button
                      className={`py-2 px-4 rounded-lg ${selectedOptions[mcqIndex] === undefined
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary text-white"
                        }`}
                      onClick={handleVideoClick}
                      loading={quizCompleteLoading}
                      disabled={quizCompleteLoading}
                    >
                      complete
                    </Button>}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Modal
        title="Explanation"
        subtitle={explanation}
        onClose={() => setDisplayModal(false)}
        open={displayModal}
      />
    </div>
  );
};

export default Quiz;
