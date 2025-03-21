import React, { useState } from "react";
import TextInput from "../InputFields/Textinput";
import TextAreaInput from "../InputFields/TextAreaInput";
import MediaInput from "../InputFields/MediaInput";
import SelectInput from "../InputFields/SelectInput";
import TagInput from "../InputFields/TagInput";
import SectionSelector from "./SectionSelector";
import AddVideoModal from "./AddVideoModal";
import AddQuizModal from "./AddQuizModal";
import Card from "../UI/Card";
import { useCourseStore } from "@/providers/CourseProvider";

const CourseFormView = ({ formattedErrors, formattedValidationErrors }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addQuizModalOpen, setAddQuizModalOpen] = useState(false);
  const { course, updateCourse, setSelectedVideoIndex, categories } = useCourseStore();

  const closeVideoModal = () => {
    setAddModalOpen(false);
    setSelectedVideoIndex(undefined);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <Card title="Module" className="col-span-2">
          <TextInput
            label={"Title"}
            placeholder={"Course Title"}
            type={"text"}
            error={formattedValidationErrors?.title || formattedErrors?.title}
            value={course.title}
            onChange={(e) => {
              updateCourse({ title: e.target.value });
              updateCourse({
                slug: e.target.value.toLowerCase().replace(/\s/g, "-"),
              });
            }}
          />
          <TextAreaInput
            label={"Description"}
            name={"description"}
            placeholder={"Course Description"}
            type={"text"}
            error={
              formattedValidationErrors?.description ||
              formattedErrors?.description
            }
            value={course.description}
            onChange={(e) => updateCourse({ description: e.target.value })}
          />
          <MediaInput
            label={"Image"}
            name={"image"}
            type={"text"}
            defaultMedia={
              Object.keys(course.image || {}).length ? [course.image] : []
            }
            error={formattedValidationErrors?.image || formattedErrors?.image}
            onChange={([image]) =>
              updateCourse(image ? { image: image } : { image: null })
            }
          />
        </Card>
        <Card className="">
          <SelectInput
            label={"Select Course"}
            name={"course"}
            placeholder={"Active/Inactive"}
            type={"text"}
            value={course.category}
            error={formattedValidationErrors?.category || formattedErrors?.category}
            options={categories?.map((item) => ({ label: item.title, value: item._id }))}
            onChange={(e) => updateCourse({ category: e.target.value })}
          />
          <SelectInput
            label={"Status"}
            name={"status"}
            placeholder={"Active/Inactive"}
            type={"text"}
            value={course.status}
            error={formattedValidationErrors?.status || formattedErrors?.status}
            options={[
              { label: "Publish", value: "published" },
              { label: "Draft", value: "draft" },
            ]}
            onChange={(e) => updateCourse({ status: e.target.value })}
          />
          <TagInput
            label={"Tags"}
            name={"tags"}
            placeholder={"Enter Tags"}
            type={"text"}
            value={course.tags}
            error={formattedValidationErrors?.tags || formattedErrors?.tags}
            onChange={(tags) => updateCourse({ tags })}
          />

          <TextInput
            label={"Slug"}
            placeholder={"Course Slug"}
            type={"text"}
            error={formattedValidationErrors?.slug || formattedErrors?.slug}
            value={course.slug}
            onChange={(e) => updateCourse({ slug: e.target.value })}
          />
        </Card>
        <SectionSelector
          addModalOpen={addModalOpen}
          setAddModalOpen={setAddModalOpen}
          setAddQuizModalOpen={setAddQuizModalOpen}
          error={formattedValidationErrors?.section || formattedErrors?.title}
        />
      </div>
      <AddVideoModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        closeModal={closeVideoModal}
      />
      <AddQuizModal
        addQuizModalOpen={addQuizModalOpen}
        setAddQuizModalOpen={setAddQuizModalOpen}
        closeModal={() => setAddQuizModalOpen(false)}
      />
    </div>
  );
};

export default CourseFormView;
