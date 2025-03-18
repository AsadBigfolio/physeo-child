import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import("@/components/Home/HeroSection"));
const FeatureSection = dynamic(() => import("@/components/Home/FeatureSection"));
const AboutUsSection = dynamic(() => import("@/components/Home/AboutUsSection"));
const ShopProductsSection = dynamic(() => import("@/components/Home/ShopProductsSection"));
const OurCoursesSection = dynamic(() => import("@/components/Home/OurCoursesSection"));
const SubscriptionSection = dynamic(() => import("@/components/Home/SubscriptionSection"));
const ReviewsSection = dynamic(() => import("@/components/Home/ReviewsSection"));
const CertificateSection = dynamic(() => import("@/components/Home/CertificateSection"));
import loadSession from "@/utils/session";
import MediaUniverse from '@/components/Home/MediaUniverse';


export const metadata = {
  title: 'Home',
  description: "Super Natural",
};

export default async function Home() {
  const session = await loadSession();
  return (
    <>
      <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto container-dynamic'>
        <HeroSection />
      </div>
      <div className='mt-[20px] md:mt-[80px]'>
        <FeatureSection />
      </div>
      {/* <ShopProductsSection /> */}
      <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto'>
      <OurCoursesSection />
      </div>
      <div className='flex flex-col gap-5 md:gap-20 max-w-[1320px] px-[20px] mx-auto'>
        <div className='md:px-[65px]'>
          <SubscriptionSection session={session} />
        </div>
        <div className='md:px-[65px]'>
          <CertificateSection />
        </div>
        <div className='md:px-[65px]'>
          <ReviewsSection />
        </div>
      </div>
      <div className='flex flex-col gap-20 max-w-[1320px] px-[20px] mx-auto mb-[40px]'>
        <AboutUsSection />
      </div>
      <div className='flex flex-col gap-20 max-w-[1320px] px-[20px] mx-auto mb-[40px]'>
        <MediaUniverse />
      </div>
    </>
  );
}
