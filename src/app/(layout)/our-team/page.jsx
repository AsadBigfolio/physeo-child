import Banner from "@/components/UI/Banner";
import { getStories } from "@/queries/story/getStories";
import React from "react";

export const metadata = {
  title: 'Our Team',
  description: "Super Natural",
};

export default async function Page({ searchParams }) {
  const page = searchParams?.page ?? 1;
  const pageSize = searchParams?.limit ?? 1000;
  const search = searchParams?.search ?? "";
  const stories = await getStories({ page, pageSize, search });
  const storyData = JSON.parse(JSON.stringify(stories?.stories)) ?? [];
  return (
    <div>
      <Banner title="Our Team" />
      <section className="max-w-[1320px] px-[20px] py-5 md:py-[80px] mx-auto flex flex-col gap-y-5 md:gap-y-12">
        <Mission />
        <Team storyData={storyData} />
      </section>
    </div>
  );
}

const Mission = () => {
  return (
    <div>
      <h2 className="text-heading-xl text-center text-primary">
        <span className='text-black'>Our</span> Mission
      </h2>
      <div className="text-center mt-5 md:mt-7">
        <p className="text-subtitle-md">
          To educate the world in the various fields of supernatural sciences, that are currently shunned, dismissed, or not widely accepted by the traditional university systems. And to create an international community of followers, connected by their interest in the paranormal, magicology, cryptozoology, ufology, conspiracy, phenomenology, and increasing the earth&aposs collective consciousness through elevated frequency vibration.
        </p>
      </div>
    </div>
  );
};

const Team = ({ storyData }) => {
  return (
    <>
      <div>
        <h2 className="text-heading-xl text-center text-primary">
          <span className='text-black'>Meet Our</span> Team
        </h2>
        <div className="text-center mt-5 md:mt-7">
          <p className="text-subtitle-md">
            Meet the dedicated team behind our Supernatural University! Our experienced instructors and researchers specialize in  Cryptozoology, Ufology, Paranormalogy, Conspiracy, Magicology, Phenomenology and more, guiding you through the mysteries of the unexplained.
        </p>
      </div>
      </div>
      <div className="grid gap-x-6 md:gap-y-6 gap-y-5 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 md:mt-10 rounded-[10px]">
        {storyData?.map((member, index) => (
          <div
            key={index}
            className="relative bg-white rounded-[10px] cursor-pointer shadow transition-shadow duration-300 ease-linear hover:shadow-lg"
          >
            <img
              className=" w-full object-cover rounded-tr-[10px] rounded-tl-[10px] object-top h-[140px] md:h-[297px]"
              src={member?.image?.src}
              alt={member.name}
            />
            <div className="p-[10px] md:p-5 text-left">
              <h4 className="leading-tight text-lg font-semibold text-gray-900 transition-colors duration-300 ease-linear">
                {member.name}
              </h4>
              <p className="text-xs font-bold text-[#0B1A3080] font-poppins">{member.role ?? ""}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
