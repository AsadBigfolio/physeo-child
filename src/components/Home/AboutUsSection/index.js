import Image from "next/image";
import RoundedButton from '../RoundedButton';

const AboutUsSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between gap-x-[75px] mt-[20px] md:mt-0">
      <div className="w-full flex flex-col gap-5 md:gap-[20px]">
        <div className="relative w-full rounded-[10px] overflow-hidden h-[250px] md:h-[350px]">
          <Image
            src="/AboutUs3.jpg"
            alt="Supernatural University interior"
            fill
            className='object-cover'
          />
        </div>
        <p className="leading-[30px] text-subtitle-md text-gray-700 font-poppins">
          The <span className="font-bold">Supernatural University&#174;</span>{" "}
          is the central hub for gathering and study of supernatural phenomena.
          Like-minded individuals gather here to elevate and educate each other on the most fascinating unexplained phenomena in our galaxy.
          And this is where you come in. New members take the courses and earn their titles and certificates and then become lifelong Alumni of the prestigious Supernatural University. And that just where the journey begins
        </p>
        <RoundedButton href="/signup" text="Join for Free" secondary />
      </div>

      <div className="w-full flex flex-col items-start gap-4 md:gap-[20px] ">
        <h2 className="hidden md:block text-heading-xl text-black ">
          Students Have <br /> Registered On Our <br />
          <span className="text-primary">Platform</span>
        </h2>
        <h2 className="block md:hidden text-heading-xl font-bold text-black mt-4">
          Students Have Registered On Our
          <span className="text-primary">{' '}Platform</span>
        </h2>
        <div className="relative w-full rounded-[10px] overflow-hidden h-[250px] md:h-[350px]">
          <Image
            src="/AboutUs2.jpg"
            alt="Supernatural University Platform"
            fill
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
