"use client";
import PrimaryLink from '@/components/PrimaryLink';
import { useState } from "react";

const pricingPlans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Access to all microbiology videos",
    features: ["Zanki integrated", "Certification prep", "Progress tracking", "Adjustable speed feature"],
  },
  {
    name: "1 Month",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    description: "Access to all pre-clinical videos",
    features: [
      "Companion PDF textbooks",
      "Ad-free",
      "Downloadable Anki decks",
      "Zanki integrated",
      "Mnemonic review feature",
      "Progress tracking",
      "Downloadable audio",
      "Access to quiz questions",
      "Adjustable speed feature",
      "Certification prep",
      "Customizable content",
    ],
  },
  {
    name: "6 Month",
    monthlyPrice: 79.99,
    yearlyPrice: 799.99,
    description: "Access to all pre-clinical videos",
    features: [
      "Companion PDF textbooks",
      "Ad-free",
      "Downloadable Anki decks",
      "Zanki integrated",
      "Mnemonic review feature",
      "Progress tracking",
      "Downloadable audio",
      "Access to quiz questions",
      "Adjustable speed feature",
      "Certification prep",
      "Customizable content",
    ],
  },
  {
    name: "1 Year",
    monthlyPrice: 99.99,
    yearlyPrice: 999.99,
    description: "Access to all pre-clinical videos",
    features: [
      "Companion PDF textbooks",
      "Ad-free",
      "Downloadable Anki decks",
      "Zanki integrated",
      "Mnemonic review feature",
      "Progress tracking",
      "Downloadable audio",
      "Access to quiz questions",
      "Adjustable speed feature",
      "Certification prep",
      "Customizable content",
    ],
  },
];
const tabs = [
  "USMLE - Preclinical",
  "USMLE - Clinical",
  "Physician Assistant",
  "Doctor of Dental Surgery",
];

const PricingCard = ({ name, price, description, buttonText, features }) => (
  <div className="bg-white p-[20px] rounded-[12px] border-[1px] border-[#E3E3E3]">
    <div className='space-y-[10px]'>
      <h3 className="text-subtitle-md font-semibold text-mainText">{name}</h3>
      <p className="text-[28px] font-semibold leading-[32px] text-mainText">${price} <span className="muted-description">{price ? "/ month" : "Free"}</span></p>
      <p className="muted-description">{description}</p>
    </div>
    <div className='mt-[16px]'>
      <PrimaryLink
        title={buttonText}
        href="/membership-checkout"
        className='!w-full'
      />
    </div>
    <ul className="mt-[16px] space-y-[12px]">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 font-[500] text-[14px]">
          <div className='size-[16px] bg-[#E6EEF4] flex justify-center items-center rounded-[60px]'> <img src="/new/checkIcon.svg" /> </div>{feature}
        </li>
      ))}
    </ul>
  </div>
);

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs[2]);

  return (
    <div className="py-[50px] ">
      <h2 className="section-heading text-center">Select your plan</h2>
      <div className='flex justify-center'>
        <div className="mt-[28px] w-fit flex justify-center items-center flex-wrap gap-[8px] bg-white px-[8px] py-[6px] rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-[14px] py-[10px] rounded-full text-[16px] font-medium leading-[20px] 
        transition-all duration-300 ease-in-out 
        ${selectedTab === tab
                  ? "bg-primary text-white shadow-md transform scale-[1.02]"
                  : "bg-[#F2F5F7] text-mainText hover:bg-blue-50 hover:shadow-sm"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[32px]">
        {pricingPlans
          .map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              description={plan.description}
              buttonText="Join"
              features={plan.features}
            />
          ))}

      </div>
    </div>
  );
}
