"use client";

import BadgeContext from '@/context/badge';
import React, { useContext, useState } from "react";

const initialState = {
    title: "",
    description: "",
    image: "",
    status: "published",
    course: ""
};

const BadgeProvider = ({ children, defaultBadge = initialState, courses }) => {
    const [badge, setBadge] = useState(defaultBadge);

    const updateBadge = (data) => {
        let newData = { ...badge, ...data };
        setBadge(newData);
    };

    const contextValue = {
        badge,
        setBadge,
        updateBadge,
        courses
    };

    return (
        <BadgeContext.Provider value={contextValue}>
            {children}
        </BadgeContext.Provider>
    );
};
export const useBadgeStore = () => {
    if (!BadgeContext) {
        throw new Error("useBlogStore must be used within a CourseProvider");
    }

    return useContext(BadgeContext);
};

export default BadgeProvider;