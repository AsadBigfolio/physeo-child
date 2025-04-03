"use client";
import { useState } from "react";

const tabs = ["Preclinical", "Clinical", "USMLE", "Physician Assistant"];

const subjectsData = {
  Preclinical: [
    { title: "Anatomy", description: "Study of human body structure.", icon: "📊" },
    { title: "Embryology", description: "Study of embryo development.", icon: "🔬" },
    { title: "Pharmacology", description: "Study of drug interactions.", icon: "💊" },
    { title: "Physiology", description: "Study of normal body functions.", icon: "🧠" },
    { title: "Public Health Sciences", description: "Study of health at a population level.", icon: "📘" },
    { title: "Biochemistry", description: "Study of chemical processes in living organisms.", icon: "🧪" },
    { title: "Immunology", description: "Study of the immune system.", icon: "🦠" },
    { title: "Nephrology", description: "Study of kidney diseases.", icon: "🩺" },
    { title: "Pulmonology", description: "Study of lung diseases.", icon: "🌬️" },
    { title: "Gastroenterology", description: "Study of digestive system disorders.", icon: "🍽️" },
    { title: "Rheumatology", description: "Study of joint diseases.", icon: "🦴" },
  ],

  Clinical: [
    { title: "Cardiology", description: "Study of heart diseases.", icon: "❤️" },
    { title: "Neurology", description: "Study of the nervous system.", icon: "🧠" },
    { title: "Endocrinology", description: "Study of hormones and glands.", icon: "🔬" },
    { title: "Nephrology", description: "Study of kidney diseases.", icon: "🩺" },
    { title: "Pulmonology", description: "Study of lung diseases.", icon: "🌬️" },
    { title: "Gastroenterology", description: "Study of digestive system disorders.", icon: "🍽️" },
    { title: "Rheumatology", description: "Study of joint diseases.", icon: "🦴" },
  ],

  USMLE: [
    { title: "Pathology", description: "Study of diseases and their causes.", icon: "🏥" },
    { title: "Microbiology", description: "Study of microorganisms.", icon: "🦠" },
    { title: "Behavioral Science", description: "Study of behavior and mental processes.", icon: "🧑‍⚕️" },
    { title: "Genetics", description: "Study of genes and heredity.", icon: "🧬" },
    { title: "Physiology", description: "Study of how the human body functions.", icon: "💪" },
    { title: "Biostatistics", description: "Statistical methods in medicine.", icon: "📊" },
  ],

  "Physician Assistant": [
    { title: "Medical Ethics", description: "Study of medical moral principles.", icon: "⚖️" },
    { title: "Surgical Techniques", description: "Techniques used in surgery.", icon: "🔪" },
    { title: "Emergency Medicine", description: "Handling urgent medical cases.", icon: "🚑" },
    { title: "Radiology", description: "Imaging techniques in medicine.", icon: "🩻" },
    { title: "Dermatology", description: "Study of skin diseases.", icon: "🩹" },
    { title: "Ophthalmology", description: "Study of eye conditions.", icon: "👁️" },
    { title: "Family Medicine", description: "Comprehensive healthcare for individuals.", icon: "👨‍👩‍👧" },
  ],
};


const CurriculumCard = ({ title, description, icon }) => (
  <div className="bg-white shadow-md rounded-lg p-[12px] flex flex-col gap-[20px] items-start">
    <div className="text-blue-500 size-[28px] rounded-[8px] bg-[#007DFC1A] p-[8px] ">{""}</div>
    <div className='flex flex-col gap-[6px]'>
      <h3 className="text-title-lg">{title}</h3>
      <p className="text-[#616161] text-[14px] leading-[20px]">{description}</p>
    </div>
  </div>
);

export default function CurriculumSection() {
  const [activeTab, setActiveTab] = useState("Preclinical");

  return (
    <div className="py-10">
      <div className="mx-auto">
        <h2 className="text-[32px] font-semibold mb-[20px]">Curriculum</h2>
        <div className="flex gap-6 border-b relative">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-subtitle-md pb-4 relative transition-colors duration-300 ${activeTab === tab
                ? "text-[#007DFC] font-semibold"
                : "text-[#616161] font-semibold hover:text-[#007DFC]/80"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              <span
                className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#007DFC] transition-all duration-300 ${activeTab === tab ? "scale-x-100" : "scale-x-0"
                  }`}
              />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[20px] mt-[30px]">
          {subjectsData[activeTab].map((subject, index) => (
            <CurriculumCard key={index} {...subject} />
          ))}
        </div>
      </div>
    </div>
  );
}
