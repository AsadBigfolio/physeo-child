"use client";
import Slider from '@/components/Slider/swipper';
import RightArrow from '@/svgs/RightArrow';
import RightArrowWhite from '@/svgs/RightArrowWhite';
import { useRef, useState } from 'react';

const books = [
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693495239575-1681941017852-7-Psychiatry.jpg",
    alt: "Psychiatry"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693495266523-1681941017860-8-Immunology.jpg",
    alt: "Immunology"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693495309165-1681941017920-10-Pathology.jpg",
    alt: "Pathology"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693495610144-1681941017859-9-Pharmacology.jpg",
    alt: "Pharmacology"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1720462861885-4-Biostatistics.png",
    alt: "Biostatistics"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693494916836-1681941017698-2-Biochemistry.jpg",
    alt: "Biochemistry"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693494949706-1681941017850-6-Embryology.jpg",
    alt: "Embryology"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693494980012-1681941017614-1-Physiology.jpg",
    alt: "Physiology"
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693496631353-1122334455.jpg",
    alt: ""
  },
  {
    url: "https://physeo-prod.s3.amazonaws.com/1693495140873-1681941017775-5-Microbiology.jpg",
    alt: "Microbiology"
  }
];
const subjectsData = {
  Preclinical: books,
  Clinical: books,
  USMLE: books,
  "Physician Assistant": books,
};
const tabs = ["Preclinical", "Clinical", "USMLE", "Physician Assistant"];
function CourseCard({ book }) {
  const { url, alt } = book
  return (
    <div className="rounded-[12px] border-[2px]  bg-white">
      <img
        className="w-full rounded-[12px] h-[321px] object-cover"
        src={url}
        alt={alt}
      />
    </div>
  );
}

const BooksSection = () => {
  const [activeTab, setActiveTab] = useState("Preclinical");
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();
  return (
    <div className="py-5 md:py-[24px] px-[23px] md:px-0 ">
      <div className='max-w-[1320px] mx-auto flex flex-col gap-[36px]'>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className="section-heading">
              Our Books
            </h1>
            <div className="z-[100] flex gap-7">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white border-1 h-[42px] w-[42px] rounded-full flex items-center justify-center rotate-180 border-[1.4px] border-[#BED2E6]"
              >
                <RightArrow width={24} height={19} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-bg-white h-[42px] w-[42px] rounded-full flex items-center justify-center border-[1.4px] border-[#BED2E6]"
              >
                <RightArrowWhite width={15} height={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-6 border-b relative">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`text-subtitle-md pb-4 relative transition-colors duration-300 ${activeTab === tab
                ? "text-[#007DFC] font-semibold"
                : "text-primary-muted font-semibold hover:text-[#007DFC]/80"
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
        <Slider sliderClass="!w-[248px]" defaultSlides={5} swiperRef={swiperRef}>
          {subjectsData[activeTab].map((book, index) => (
            <CourseCard book={book} key={index} />
          ))}

        </Slider>
      </div>
    </div>
  );
};

export default BooksSection;
