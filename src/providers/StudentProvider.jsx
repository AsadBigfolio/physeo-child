"use client";

import StudentContext from "@/context/studentContext";
import { FREEPLAN } from '@/utils/constant';
import React, { useState } from "react";

const initialState = {
  _id: "",
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  isEmailVerified: "",
  houseOfLight: "",
  address: "",
  about: "",
  gender: "male",
  image: "",
  subscribedPlans: [FREEPLAN],
  selectedCourses: [],
};

const StudentProvider = ({ children, defaultStudent = initialState, courses = [] }) => {
  const [student, setStudent] = useState(defaultStudent);

  const updateStudent = (data) => {
    let newData = { ...student, ...data };
    setStudent(newData);
  };

  const contextValue = {
    student,
    setStudent,
    updateStudent,
    courses
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;
