"use client";
import { useState } from "react";
import OverViewTab from "./OverViewTab";
import QnATab from "./QnATab";
import ReviewsTab from "./ReviewsTab";

const VideoTabs = () => {
  const [currentTab, setCurrentTab] = useState("overview");
  const tabList = [
    { label: "Overview", value: "overview" },
    { label: "Q&A", value: "qna" },
    { label: "Reviews", value: "reviews" },
  ];

  return (
    <div>
      <div className="flex">
        {tabList.map((tab, index) => {
          const isActive = tab.value === currentTab;
          return (
            <h2
              className={`py-[26px] w-[250px] text-center px-[80px] text-title-lg font-poppins ${
                isActive ? "text-white bg-primary" : "text-mainText"
              }`}
              key={index}
              onClick={() => setCurrentTab(tab.value)}
            >
              {tab.label}
            </h2>
          );
        })}
      </div>
      <div>
        {currentTab === "overview" && <OverViewTab />}
        {currentTab === "qna" && <QnATab />}
        {currentTab === "reviews" && <ReviewsTab />}
      </div>
    </div>
  );
};

export default VideoTabs;
