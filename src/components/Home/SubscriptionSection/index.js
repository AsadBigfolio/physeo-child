"use client";
import PrimaryLink from '@/components/PrimaryLink';
import { useState } from "react";

const pricingPlans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Access to all microbiology videos",
    buttonText: "Free trial",
    features: ["Zanki integrated", "Certification prep", "Progress tracking", "Adjustable speed feature"],
  },
  {
    name: "Preclinical",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    description: "Access to all pre-clinical videos",
    buttonText: "Join Preclinical",
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
    name: "Clinical",
    monthlyPrice: 79.99,
    yearlyPrice: 799.99,
    description: "Access to all pre-clinical videos",
    buttonText: "Join Clinical",
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
    name: "USMLE",
    monthlyPrice: 99.99,
    yearlyPrice: 999.99,
    description: "Access to all pre-clinical videos",
    buttonText: "Join USMLE",
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

const PricingCard = ({ name, price, description, buttonText, features }) => (
  <div className="bg-white p-[20px] w-[315px] rounded-[12px] border-[1px] border-[#E3E3E3]">
    <div className='space-y-[10px]'>
      <h3 className="text-subtitle-md font-semibold">{name}</h3>
      <p className="text-[28px] font-semibold leading-[32px]">${price} <span className="text-[#616161] font-[450] text-[14px]">{price ? "/ month" : "Free"}</span></p>
      <p className="text-[#616161] font-[450] text-[14px]">{description}</p>
    </div>
    <div className='mt-[16px]'>
      <PrimaryLink
        title={buttonText}
        href="/membership-checkout"
        isBlock
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

  return (
    <div className="py-12">
      <div className="mx-auto text-center">
        <h2 className="text-3xl font-bold">Select your plan</h2>
        <div className="mt-4 flex justify-center items-center space-x-2 bg-white px-[22px] py-[8px] h-[52px] rounded-full w-[187px] mx-auto transition-colors duration-300">
          <button
            className={`px-[14px] font-semibold h-[40px] rounded-full transition-all duration-300 ease-out ${!isYearly
              ? "bg-[#007DFC] text-white shadow-lg transform scale-105"
              : "text-black hover:bg-white hover:shadow-sm"
              }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-[14px] font-semibold h-[40px] rounded-full transition-all duration-300 ease-out ${isYearly
              ? "bg-[#007DFC] text-white shadow-lg transform scale-105"
              : "text-black hover:bg-white hover:shadow-sm"
              }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mt-8">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            name={plan.name}
            price={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
            description={plan.description}
            buttonText={plan.buttonText}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
}
