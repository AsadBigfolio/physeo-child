"use client";

import UserCourseContext from "@/context/userCourse";
import React, { useState } from "react";

const UserCourseProvider = ({ children, defaultCourse = {} }) => {
  const [courseData, setCourseData] = useState(defaultCourse);
  const [activeSections, setActiveSections] = useState([])
  const [currentVideoData, setCurrentVideoData] = useState(null)
  const [quizSection, setQuizSection] = useState(null)

  const contextValue = {
    courseData,
    setCourseData,
    activeSections,
    setActiveSections,
    currentVideoData,
    setCurrentVideoData,
    quizSection,
    setQuizSection
  };

  return (
    <UserCourseContext.Provider value={contextValue}>
      {children}
    </UserCourseContext.Provider>
  );
};

export default UserCourseProvider;
