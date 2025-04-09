import AOSInitializer from '@/components/AOSInitializer';

import HeroSection from "@/components/Home/HeroSection";
import CourseSection from "@/components/Home/CourseSection";
import BooksSection from "@/components/Home/BooksSection";
import CurriculumSection from "@/components/Home/CurriculumSection";
import SubscriptionSection from "@/components/Home/SubscriptionSection";
import ReviewsSection from "@/components/Home/ReviewsSection";
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";
import loadSession from "@/utils/session";
import PremiumSection from '@/components/Home/PremiumSection';

export const metadata = {
  title: 'Home',
  description: "Super Natural",
};

export default async function Home() {
  const session = await loadSession();

  return (
    <>
      <AOSInitializer />
      <div style={{ backgroundImage: 'url(/new/heroSectionBg.png)' }}>
        <div className='flex flex-col max-w-[1320px] mx-auto' >
          <HeroSection />
        </div>
      </div>
      <div className='mt-[10px]'>
        <CourseSection />
      </div>
      <div style={{ backgroundImage: 'url(/new/circulumbg.png)', height: 776 }} >
        <div className='max-w-[1320px] mx-auto'>
          <CurriculumSection />
        </div>
      </div>
      <div className='max-w-[1320px] mx-auto' >
        <WhyChooseUsSection />
      </div>
      <div className="overflow-hidden">
        <div
          style={{ backgroundImage: 'url(/new/background.png)', height: 861 }}
          // data-aos="fade-left"
          // data-aos-delay="500"
        >
          <div className='max-w-[1320px] px-[20px] mx-auto'>
            <SubscriptionSection session={session} />
          </div>
        </div>
      </div>
      <div className='max-w-[1320px] mx-auto' >
        <ReviewsSection />
      </div>
      <div className="overflow-hidden">
        <div style={{ backgroundImage: 'url(/new/booksbg.png)', height: 588 }} >
          <div className='flex flex-col gap-20 max-w-[1320px] mx-auto mb-[40px]'>
            <BooksSection />
          </div>
        </div>
      </div>
      <div className='max-w-[1320px] mx-auto py-[40px]' >
        <PremiumSection />
      </div>
    </>
  );
}
