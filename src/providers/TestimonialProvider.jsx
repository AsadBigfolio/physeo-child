"use client";

import TestimonialContext from '@/context/testimonial';
import React, { useContext, useState } from "react";

const initialState = {
    userName: "",
    message: "",
    image: "",
    status: "published",
    rating: 0
};

const TestimonialProvider = ({ children, defaultTestimonial = initialState }) => {
    const [testimonial, setTestimonial] = useState(defaultTestimonial);

    const updateTestimonial = (data) => {
        let newData = { ...testimonial, ...data };
        setTestimonial(newData);
    };

    const contextValue = {
        testimonial,
        setTestimonial,
        updateTestimonial,
    };

    return (
        <TestimonialContext.Provider value={contextValue}>
            {children}
        </TestimonialContext.Provider>
    );
};
export const useTestimonialStore = () => {
    if (!TestimonialContext) {
        throw new Error("useTestimonialStore must be used within a CourseProvider");
    }

    return useContext(TestimonialContext);
};

export default TestimonialProvider;