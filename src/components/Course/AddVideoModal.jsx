import React, { useEffect, useState } from "react";
import TextAreaInput from "@/components/InputFields/TextAreaInput";
import TextInput from "@/components/InputFields/Textinput";
import Modal from "@/components/UI/Modal";
import MediaInput from "@/components/InputFields/MediaInput";
import { useCourseStore } from "@/providers/CourseProvider";
import { formatErrors } from "@/utils/formatTRPCErrors";
import { z } from "zod";
import { videoSchema } from "@/validations/courseSchema";
import CheckboxInput from '../InputFields/ChecboxField';

const AddVideoModal = ({ addModalOpen, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [validationErrors, setValidationErrors] = useState();
  const [isTrial, setVideoTrial] = useState(false);

  const { course, updateCourse, selectedVideoIndex, selectedSectionIndex } =
    useCourseStore();

  const selectedVideo =
    course.sections?.[selectedSectionIndex]?.videos?.[selectedVideoIndex];

  const resetState = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setVideoThumbnail("");
    setValidationErrors(null);
    setVideoTrial(false)
  };

  useEffect(() => {
    if (selectedVideo) {
      setTitle(selectedVideo.title);
      setDescription(selectedVideo.description);
      setVideoUrl(selectedVideo.url);
      setVideoThumbnail(selectedVideo.thumbnail);
      setVideoTrial(selectedVideo.isTrial)
    } else {
      resetState();
    }
  }, [selectedVideo]);

  const handleAddVideo = () => {
    try {
      videoSchema.parse({
        title,
        description,
        url: videoUrl,
        thumbnail: videoThumbnail,
      });

      const video = {
        title,
        description,
        url: videoUrl,
        thumbnail: videoThumbnail,
        isTrial,
        _id: selectedVideo?._id
      };

      const updatedSections = [...course.sections];
      if (selectedVideo) {
        updatedSections[selectedSectionIndex].videos[selectedVideoIndex] =
          video;
      } else {
        updatedSections[selectedSectionIndex].videos.push(video);
      }
      updateCourse({ sections: updatedSections });
      closeModal();
      resetState();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formatErrors(error);
        setValidationErrors(formattedErrors);
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
      <TextInput
        label={"Lesson Title"}
        name={"lessonTitle"}
        placeholder={"Lesson Title"}
        type={"text"}
        value={title}
        error={validationErrors?.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextAreaInput
        label={"Lesson Description"}
        name={"lessonDescription"}
        placeholder={"Lesson Description"}
        error={validationErrors?.description}
        value={description}
        type={"text"}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextInput
        label={"Video File"}
        name={"VideoUrl"}
        value={videoUrl}
        placeholder={"https://example.com/image.jpg"}
        error={validationErrors?.url}
        type={"text"}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <MediaInput
        label={"Video Thumbnail"}
        name={"thumbnail"}
        defaultMedia={videoThumbnail ? [videoThumbnail] : []}
        error={validationErrors?.thumbnail}
        onChange={([thumbnail]) =>
          setVideoThumbnail(
            thumbnail ? { src: thumbnail.src, _id: thumbnail._id } : null
          )
        }
      />
      <CheckboxInput
        label={'Available Free trial'}
        labelStyles='text-[12px] xl:text-para-base font-poppins font-semibold'
        onChange={(e) => setVideoTrial(e)}
        value={isTrial}
      />
    </Modal>
  );
};

export default AddVideoModal;
