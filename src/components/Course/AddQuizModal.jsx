import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import TextAreaInput from "@/components/InputFields/TextAreaInput";
import TextInput from "@/components/InputFields/Textinput";
import Modal from "@/components/UI/Modal";
import SelectInput from "@/components/InputFields/SelectInput";
import { quizSchema } from "@/validations/QuizSchema";
import { useCourseStore } from "@/providers/CourseProvider";
import { formatQuizErrors } from "@/utils/formatTRPCErrors";

import Editor from "../Editor";

const AddQuizModal = ({ addQuizModalOpen, closeModal }) => {
  const { updateCourse, course, selectedSectionIndex, selectedVideoIndex } =
    useCourseStore();
  const [mcqs, setMcqs] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (course && selectedSectionIndex >= 0 && selectedVideoIndex >= 0) {
      const sectionWithQuizzes = course?.sections[selectedSectionIndex]?.videos[selectedVideoIndex];

      setMcqs(sectionWithQuizzes?.quiz?.mcqs || []);
      setQuizTitle(sectionWithQuizzes?.quiz?.title || "");
    }
  }, [course, selectedSectionIndex, selectedVideoIndex]);

  const handleAddMcq = () => {
    setMcqs([
      ...mcqs,
      {
        title: "",
        description: "",
        options: [{ option: "" }, { option: "" }],
        correctOption: 0,
        explanation: "",
      },
    ]);
  };

  const handleRemoveMcq = (index) => {
    const newMcqs = mcqs.filter((_, i) => i !== index);
    setMcqs(newMcqs);
  };

  const handleMcqChange = (index, field, value) => {
    const newMcqs = [...mcqs];
    newMcqs[index][field] = value;
    setMcqs(newMcqs);
  };

  const handleOptionChange = (mcqIndex, optionIndex, value) => {
    const newMcqs = [...mcqs];
    newMcqs[mcqIndex].options[optionIndex].option = value;
    setMcqs(newMcqs);
  };

  const handleAddOption = (mcqIndex) => {
    const newMcqs = [...mcqs];
    newMcqs[mcqIndex].options.push({ option: "" });
    setMcqs(newMcqs);
  };

  const handleRemoveOption = (mcqIndex, optionIndex) => {
    const newMcqs = [...mcqs];
    newMcqs[mcqIndex].options.splice(optionIndex, 1);
    setMcqs(newMcqs);
  };

  const handleCorrectOptionChange = (mcqIndex, optionIndex) => {
    const newMcqs = [...mcqs];
    newMcqs[mcqIndex].correctOption = optionIndex;
    setMcqs(newMcqs);
  };

  const handleSaveQuiz = () => {
    const quizData = { title: quizTitle, mcqs };
    const result = quizSchema.safeParse(quizData);

    const errors = formatQuizErrors(result.error);

    if (!result.success) {
      setValidationErrors(errors);
      return;
    }

    const updatedSections = [...course.sections]
    updatedSections[selectedSectionIndex].videos[selectedVideoIndex].quiz = quizData
    updateCourse({ sections: updatedSections });

    closeModal();
  };
  return (
    <Modal
      title="Add Quiz"
      subtitle=""
      onClose={closeModal}
      open={addQuizModalOpen}
      actions={[
        {
          content: "Save",
          onAction: handleSaveQuiz,
        },
      ]}
    >
      <TextInput
        label="Quiz Title"
        name="quizTitle"
        placeholder="Quiz Title"
        type="text"
        error={validationErrors?.title || validationErrors?.mcqs}
        onChange={(e) => setQuizTitle(e.target.value)}
        value={quizTitle}
      />

      {mcqs.map((mcq, index) => (
        <div key={index} className="border p-4 mb-4 rounded relative">
          <button
            type="button"
            onClick={() => handleRemoveMcq(index)}
            className="absolute top-2 right-2 text-primary"
          >
            <FiX size={20} />
          </button>
          <TextAreaInput
            label={"Question"}
            name={"question"}
            error={validationErrors?.[`mcqs.${index}.title`]}
            onChange={(e) => {
              return handleMcqChange(index, "title", e.target.value);
            }}
            value={mcq?.title}
          />
          {mcq.options.map((option, optIndex) => (
            <div key={optIndex} className="flex items-center mb-2">
              <TextInput
                label={`Option ${optIndex + 1}`}
                name={`mcqOption-${index}-${optIndex}`}
                placeholder={`Option ${optIndex + 1}`}
                value={option?.option}
                type="text"
                error={
                  validationErrors?.[`mcqs.${index}.options.${optIndex}.option`]
                }
                onChange={(e) =>
                  handleOptionChange(index, optIndex, e.target.value)
                }
              />
              {optIndex > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index, optIndex)}
                  disabled={mcq.options.length <= 2}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddOption(index)}
            className="text-blue-500 mb-4"
          >
            Add Option
          </button>
          <SelectInput
            label="Correct Option"
            name={`mcqCorrectOption-${index}`}
            options={[
              { value: "", label: "Select Option" },
              ...mcq.options.map((_, idx) => ({
                value: idx,
                label: `Option ${idx + 1}`,
              })),
            ]}
            value={Number(mcq.correctOption)}
            error={validationErrors?.[`mcqs.${index}.correctOption`]}
            onChange={(e) =>
              handleCorrectOptionChange(index, Number(e.target.value))
            }
          />
          <TextAreaInput
            label="Explanation"
            name={`mcqExplanation-${index}`}
            placeholder="Explanation"
            value={mcq?.explanation}
            onChange={(e) =>
              handleMcqChange(index, "explanation", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={handleAddMcq} className="mt-4">
        Add Question
      </button>
    </Modal>
  );
};

export default AddQuizModal;
