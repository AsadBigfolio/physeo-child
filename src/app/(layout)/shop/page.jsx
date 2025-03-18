"use client";
import Banner from "@/components/UI/Banner";
import ShopCardList from '@/components/ShopCardsList';

const page = () => {
  return (
    <div className="space-y-[50px] 2xl:space-y-[80px] ">
      <Banner title="Shop" />
      <ShopCardList />
    </div>
  );
};
export default page;
