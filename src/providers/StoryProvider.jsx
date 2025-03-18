"use client";

import StoryContext from '@/context/story';
import React, { useState } from "react";

const initialState = {
    name: "",
    role: "",
    image: "",
    status: "published"
};

const StoryProvider = ({ children, defaultStory = initialState }) => {
    const [story, setStory] = useState(defaultStory);

    const updateStory = (data) => {
        let newData = { ...story, ...data };
        setStory(newData);
    };

    const contextValue = {
        story,
        setStory,
        updateStory,
    };

    return (
        <StoryContext.Provider value={contextValue}>
            {children}
        </StoryContext.Provider>
    );
};

export default StoryProvider;