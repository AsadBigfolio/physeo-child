"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { createCourseSchema, updateCourseSchema } from "@/validations/courseSchema";
import { useParams } from 'next/navigation';

const initialState = {
  title: "",
  description: "",
  tags: [],
  image: {},
  sections: [],
  status: "published",
  slug: "",
  category: "649c803bc44dab502b7c7092" // preclinical id
};

const courseReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_COURSE":
      const newState = { ...state, ...action.payload };
      return newState;
    default:
      return state;
  }
};

const CourseContext = createContext({});

const CourseProvider = ({ children, defaultCourse = initialState, categories = [] }) => {
  const params = useParams()
  const [course, dispatch] = useReducer(courseReducer, defaultCourse);
  const [isDisabled, setIsDisabled] = useState(true);
  const [validationErrors, setValidationErrors] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(undefined);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(undefined);

  useEffect(() => {
    const result = params?.id ? updateCourseSchema.safeParse(course) : createCourseSchema.safeParse(course);
    setIsDisabled(!result.success);
    setValidationErrors(result.error);
  }, [course]);

  const updateCourse = (data) => {
    dispatch({ type: "UPDATE_COURSE", payload: data });
  };
  return (
    <CourseContext.Provider
      value={{
        course,
        categories,
        validationErrors,
        selectedSectionIndex,
        selectedVideoIndex,
        isDisabled,
        setSelectedSectionIndex,
        setSelectedVideoIndex,
        updateCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseStore = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseStore must be used within a CourseProvider");
  }
  return context;
};

export default CourseProvider;
