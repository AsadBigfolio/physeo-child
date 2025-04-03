import React, { useEffect, useState } from "react";
import TextAreaInput from "@/components/InputFields/TextAreaInput";
import TextInput from "@/components/InputFields/Textinput";
import Modal from "@/components/UI/Modal";
import MediaInput from "@/components/InputFields/MediaInput";
import { useCourseStore } from "@/providers/CourseProvider";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { z } from "zod";
import { videoSchema } from "@/validations/courseSchema";
import CheckboxInput from "../InputFields/ChecboxField";
import TagInput from "../InputFields/TagInput";

const AddVideoModal = ({ addModalOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming, including variables, functions, and loops.",
    videoUrl: "https://example.com/video/intro-to-js.mp4",
    audioUrl: "https://example.com/audio/intro-to-js.mp3",
    pdfUrl: "https://example.com/pdf/intro-to-js.pdf",
    mnemonicsDesktop: "https://example.com/pdf/intro-to-js.pdf",
    mnemonicsMobile: "https://example.com/pdf/intro-to-js.pdf",
    thumbnail: {
      src: "https://superu.s3.us-east-2.amazonaws.com/files/Ufology 1_7def6fd2-2a87-408a-83b9-f918a8a67ad4.png",
      _id: "66f19a4299bf7cf616c88f9c",
    },
    isTrial: true,
    topics: ["JavaScript", "Programming", "Web Development"],
  });


  const [validationErrors, setValidationErrors] = useState(null);

  const { course, updateCourse, selectedVideoIndex, selectedSectionIndex } =
    useCourseStore();

  const selectedVideo =
    course.sections?.[selectedSectionIndex]?.videos?.[selectedVideoIndex];

  const resetState = () => {
    setFormData({
      title: "",
      description: "",
      videoUrl: "",
      audioUrl: "",
      pdfUrl: "",
      mnemonicsDesktop: "",
      mnemonicsMobile: "",
      thumbnail: null,
      isTrial: false,
      topics: [],
    });
    setValidationErrors(null);
  };

  useEffect(() => {
    if (selectedVideo) {
      setFormData({
        title: selectedVideo.title || "",
        description: selectedVideo.description || "",
        videoUrl: selectedVideo.videoUrl || "",
        audioUrl: selectedVideo.audioUrl || "",
        pdfUrl: selectedVideo.pdfUrl || "",
        mnemonicsDesktop: selectedVideo.mnemonicsDesktop || "",
        mnemonicsMobile: selectedVideo.mnemonicsMobile || "",
        thumbnail: selectedVideo.thumbnail || null,
        isTrial: selectedVideo.isTrial || false,
        topics: selectedVideo.topics || [],
      });
    }
    else {
      // resetState();
    }
  }, [selectedVideo]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddVideo = () => {
    try {
      videoSchema.parse(formData);

      const video = {
        ...formData,
        _id: selectedVideo?._id,
      };

      const updatedSections = [...course.sections];
      if (selectedVideo) {
        updatedSections[selectedSectionIndex].videos[selectedVideoIndex] = video;
      } else {
        updatedSections[selectedSectionIndex].videos.push(video);
      }

      updateCourse({ sections: updatedSections });
      closeModal();
      // resetState();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(formatErrors(error));
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };
  return (
    <Modal
      title="Add Lesson"
      subtitle=""
      onClose={closeModal}
      open={addModalOpen}
      actions={[
        {
          content: "Save",
          onAction: handleAddVideo,
        },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
        <div className="col-span-1">
          <TextInput
            label="Lesson Title"
            name="title"
            placeholder="Enter lesson title"
            type="text"
            value={formData.title}
            error={validationErrors?.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Video URL"
            name="videoUrl"
            placeholder="Enter video URL"
            value={formData.videoUrl}
            error={validationErrors?.videoUrl}
            onChange={(e) => handleChange("videoUrl", e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <TextAreaInput
            label="Lesson Description"
            name="description"
            placeholder="Enter lesson description"
            value={formData.description}
            error={validationErrors?.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Audio URL"
            name="audioUrl"
            placeholder="Enter audio URL"
            value={formData.audioUrl}
            error={validationErrors?.audioUrl}
            onChange={(e) => handleChange("audioUrl", e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="PDF URL"
            name="pdfUrl"
            placeholder="Enter PDF URL"
            value={formData.pdfUrl}
            error={validationErrors?.pdfUrl}
            onChange={(e) => handleChange("pdfUrl", e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Mnemonics (Desktop)"
            name="mnemonicsDesktop"
            placeholder="Enter mnemonics for desktop"
            value={formData.mnemonicsDesktop}
            error={validationErrors?.mnemonicsDesktop}
            onChange={(e) => handleChange("mnemonicsDesktop", e.target.value)}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Mnemonics (Mobile)"
            name="mnemonicsMobile"
            placeholder="Enter mnemonics for mobile"
            value={formData.mnemonicsMobile}
            error={validationErrors?.mnemonicsMobile}
            onChange={(e) => handleChange("mnemonicsMobile", e.target.value)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <TagInput
            label="Topics"
            name="topics"
            placeholder="Enter topics"
            value={formData.topics}
            isTopic
            error={validationErrors?.topics}
            onChange={(topics) => handleChange("topics", topics)}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <MediaInput
            label="Video Thumbnail"
            name="videoThumbnail"
            defaultMedia={formData.thumbnail ? [formData.thumbnail] : []}
            error={validationErrors?.videoThumbnail}
            onChange={([thumbnail]) =>
              handleChange("videoThumbnail", thumbnail ? { src: thumbnail.src, _id: thumbnail._id } : null)
            }
          />
        </div>
        <div className="col-span-1 md:col-span-2 my-2">
          <CheckboxInput
            label="Available Free Trial"
            labelStyles="text-[12px] xl:text-para-base font-poppins font-semibold"
            value={formData.isTrial}
            onChange={(e) => handleChange("isTrial", e)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddVideoModal;
