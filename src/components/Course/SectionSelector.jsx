"use client";

import React, { useContext, useState } from "react";
import TextInput from "@/components/InputFields/Textinput";
import Button from "@/components/UI/Button";
import { Accordion } from "@/components/UI/Accordian";
import Card from "@/components/UI/Card";
import SectionVideos from "./SectionVideos";
import { useCourseStore } from "@/providers/CourseProvider";

const SectionSelector = ({
  error,
  setAddModalOpen,
  setAddQuizModalOpen,
  addModalOpen,
}) => {
  const {
    course,
    updateCourse,
    selectedSectionIndex,
    setSelectedSectionIndex,
  } = useCourseStore();

  const sections = course.sections;
  const setSections = (sections) => {
    updateCourse({ ...course, sections });
  };

  const [isAdding, setIsAdding] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [showTitleError, setShowTitleError] = useState("");
  const [openAccordion, setOpenAccordion] = React.useState("item--1");
  const handleAddSection = () => {
    if (newSectionTitle) {
      setShowTitleError("");
      const newSection = { title: newSectionTitle, videos: [] };
      setSections([...sections, newSection]);
      setNewSectionTitle("");
      setIsAdding(false);
    } else {
      setShowTitleError("Please Enter Section Title");
    }
  };

  const handleSectionSelect = (index) => {
    setSelectedSectionIndex(index);
  };
  const onDelete = (sectionIndex) => {
    const sectionsCopy = [...course.sections];
    sectionsCopy.splice(sectionIndex, 1)
    updateCourse({ ...course, sections: sectionsCopy });
  }
  return (
    <Card
      title="Sub Module"
      className="col-span-3"
      primaryAction={
        sections?.length > 0 &&
        !isAdding && {
          content: "Add Sub Module",
          onAction: () => setIsAdding(true),
        }
      }
    >
      <div>
        <label className="block text-sm font-medium text-gray-700"></label>
        <div className="mt-1 block w-full">
          <Accordion
            items={sections?.map((section, i) => ({
              label: <div>{section.title}</div>,
              onClick: () => {
                handleSectionSelect(i);
              },
              content: (
                <div className="py-8">
                  <div className='px-5'>
                    <SectionVideos
                      addModalOpen={addModalOpen}
                      setAddModalOpen={setAddModalOpen}
                      setAddQuizModalOpen={setAddQuizModalOpen}
                      section={section}
                    />
                  </div>
                </div>
              ),
            }))}
            onDelete={onDelete}
            openValue={openAccordion}
            setOpenAccordion={setOpenAccordion}
          />
        </div>
        {sections?.length === 0 && !isAdding && (
          <div className="flex justify-center items-center gap-2 h-32 flex-col">
            <p className="text-gray-500 text-sm">No sections added yet</p>
            <Button
              size="sm"
              type="button"
              onClick={() => setIsAdding(true)}
            >
              Add Section
            </Button>
          </div>
        )}
        {isAdding && (
          <div className="mt-4">
            <TextInput
              label="Title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSection();
                  setOpenAccordion(`item-${sections.length}`)
                  handleSectionSelect(sections.length);
                }
              }}
              error={showTitleError}
            />
            <Button onClick={handleAddSection} className="mt-2" type="button">
              Add
            </Button>
          </div>

        )}
      </div>
      <TextInput
        value={selectedSectionIndex}
        name={"section"}
        type={"hidden"}
        error={error}
      />
    </Card>
  );
};

export default SectionSelector;
