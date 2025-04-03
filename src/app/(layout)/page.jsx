import dynamic from 'next/dynamic';
import AOSInitializer from '@/components/AOSInitializer';

const HeroSection = dynamic(() => import("@/components/Home/HeroSection"));
const CourseSection = dynamic(() => import("@/components/Home/CourseSection"));
const BooksSection = dynamic(() => import("@/components/Home/BooksSection"));
const CurriculumSection = dynamic(() => import("@/components/Home/CurriculumSection"));
const SubscriptionSection = dynamic(() => import("@/components/Home/SubscriptionSection"));
const ReviewsSection = dynamic(() => import("@/components/Home/ReviewsSection"));
const WhyChooseUsSection = dynamic(() => import("@/components/Home/WhyChooseUsSection"));
import loadSession from "@/utils/session";

export const metadata = {
  title: 'Home',
  description: "Super Natural",
};

export default async function Home() {
  const session = await loadSession();

  return (
    <>
      <AOSInitializer />
      <div className='bg-gradient-to-b from-blue-50 to-blue-100'>
        <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto' data-aos="fade-up" data-aos-delay="100">
          <HeroSection />
        </div>
      </div>
      <div className='mt-[10px] ' data-aos="fade-up" data-aos-delay="200">
        <CourseSection />
      </div>
      <div style={{ backgroundImage: 'url(/new/circulumbg.png)', height: 776 }} data-aos="zoom-in" data-aos-delay="300">
        <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto'>
          <CurriculumSection />
        </div>
      </div>
      <div className='max-w-[1320px] px-[20px] mx-auto' data-aos="flip-up" data-aos-delay="400">
        <WhyChooseUsSection />
      </div>
      <div className="overflow-hidden">
        <div
          style={{ backgroundImage: 'url(/new/background.png)', height: 861 }}
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto'>
            <SubscriptionSection session={session} />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto' data-aos="fade-right" data-aos-delay="600">
        <ReviewsSection />
      </div>
      <div className="overflow-hidden">
        <div style={{ backgroundImage: 'url(/new/booksbg.png)', height: 591 }} data-aos="fade-left" data-aos-delay="700">
          <div className='flex flex-col gap-20 max-w-[1320px] px-[20px] mx-auto mb-[40px]'>
            <BooksSection />
          </div>
        </div>
      </div>
    </>
  );
}
