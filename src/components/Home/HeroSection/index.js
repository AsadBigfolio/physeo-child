import Link from "next/link";
import UpdateStars from "@/svgs/UpdateStars.js";
import VideoModal from "@/components/VideoModal";
import loadSession from '@/utils/session';
import RoundedButton from '../RoundedButton';

const HeroSection = async () => {
  const session = await loadSession();
  const user = session?.user;
  return (
    <div className="grid xl:grid-cols-2 gap-[50px] mt-[20px] md:mt-[80px]">
      <div className="text-mainText relative max-h-fit">
        <div className='flex flex-col'>
          {/* <div className="flex z-10 md:p-2 w-[192px] md:h-[55px] items-center bg-[#6347EB30] rounded-[100px] text-white">
          <span className="bg-white h-[48px] min-w-[48px] flex items-center justify-center rounded-full scale-75 2xl:scale-100">
            <UpdateStars />
          </span>
          <p className="text-sm md:text-base text-primary font-poppins font-[600] px-3">
            Get Certified
          </p>
          </div> */}
          <div >
            <h1 className="text-display-xxl ">
              The Supernatural <br />
              University
              <span className='font-serif text-[20px] absolute mt-3'>&#174;</span>
          </h1>
        </div>
          <p className="text-subtitle-md md:mt-[10px] text-[#202020] max-w-[645px]">
            Welcome to Supernatural University&#174;, where the mysteries of our world—and beyond—are yours to explore. Dive into the uncharted realms of Cryptozoology, Ufology, Paranormology, Phenomenology, Conspiracy, and Magicology through immersive video courses that unlock official certifications in the supernatural arts. Unravel the truth behind Sasquatch, Chupacabra, and Skinwalkers, uncover the hidden agendas of secret societies, explore alien encounters and UFO phenomena. Learn from certified professors and fueled by curiosity, Super U is more than just an exclusive club—it’s a gateway to the unknown. Whether you’re drawn to the shadows of haunted places, the secrets of government cover-ups, or the wonders of mythical creatures, your journey begins here. Join today and become a certified scholar of the supernatural.
            <Link className="text-blue-500" href={"/courses"}>
            {" "}
            Learn More.
          </Link>
        </p>
          {!user?.id && <RoundedButton href='/signup' className='mt-[20px] md:mt-[20px]' text='Join For Free' />}
        </div>
        <div className="absolute -z-10 bg-primary h-[300px] w-[300px] md:h-[400px] md:w-[400px] opacity-30 top-[10px] left-[10px] blur-3xl rounded-full" />
      </div>
      <div className="max-w-[960px] m-auto ">
        <VideoModal />
      </div>
    </div>
  );
};

export default HeroSection;
