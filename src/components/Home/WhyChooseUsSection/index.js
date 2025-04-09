"use client";
import { useState } from "react";

const features = [
  { title: "Pass the First Time, Guaranteed", description: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.", icon: "📊" },
  { title: "Insights and analytics", description: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.", icon: "📈" },
  { title: "Certification prep", description: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.", icon: "📜" },
  { title: "Insights and analytics", description: "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.", icon: "👓" },
];

const FeatureCard = ({ title, description, icon, isActive, onClick }) => (
  <div
    className={`flex gap-4 p-[20px] items-center h-[112px] border rounded-lg shadow-sm cursor-pointer bg-gray-50 transition-all ${isActive ? "border-[#007DFC]" : "border-[#E3E3E3]"
      }`}
    onClick={onClick}
  >
    <div className="text-2xl">{icon}</div>
    <div className='flex flex-col gap-[8px]'>
      <h3 className="card-heading">{title}</h3>
      <p className="muted-description">{description}</p>
    </div>
  </div>
);

export default function WhyChooseUsSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Default selected item

  return (
    <section className="py-12">
      <div className="mx-auto flex justify-between">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-end'>
          <div>
            <h2 className="section-heading mb-6 text-mainText">
              Why Do Thousands of Students Turn to Physeo?
            </h2>
            <div className="space-y-[20px]">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  {...feature}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[568px] h-[508px] ">
              <img
                src="/new/adminPic.png"
                alt="Mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
