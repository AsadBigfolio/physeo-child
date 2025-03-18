import Banner from "@/components/UI/Banner";
import LinkedinIconPurple from "@/svgs/LinkedinIconPurple";
import YoutubeIconPurple from "@/svgs/YoutubeIconPurple";
import FacebookIconPurple from "@/svgs/FacebookIconPurple";
import TwitterIconPurple from "@/svgs/TwitterIconPurple";
import InstagramIconPurple from "@/svgs/InstagramIconPurple";
import TiktokIconPurple from "@/svgs/TiktokIconPurple";
import Link from 'next/link';
import ContactForm from '@/components/ContactUsForm';

const socialLinks = [
  { href: "https://www.facebook.com/thesupernaturaluniversity", icon: <FacebookIconPurple /> },
  { href: "https://www.twitter.com", icon: <TwitterIconPurple /> },
  { href: "https://www.instagram.com/thesupernaturaluniversity", icon: <InstagramIconPurple /> },
  { href: "https://www.youtube.com/@thesupernaturaluniversity", icon: <YoutubeIconPurple /> },
  { href: "https://www.linkedin.com/company/thesupernaturaluniversity", icon: <LinkedinIconPurple /> },
  { href: "https://www.tiktok.com", icon: <TiktokIconPurple /> },
];

const SocialMediaIcons = () => (
  <div className="flex gap-x-4 ">
    {socialLinks.map(({ href, icon }, index) => (
      <Link href={href} key={index} target="_blank">
        <span className="hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </Link>
    ))}
  </div>
);

export default function Page() {
  return (
    <div>
      <Banner title="Contact Us" />
      <div className="text-mainText bg-secondaryWhite relative py-[20px] md:py-[80px]">
        <div className="max-w-[1320px] px-[20px] mx-auto">
          <h2 className="text-[24px] md:text-5xl font-bold leading-[30.72px] md:leading-[61.44px] mb-[20px] md:mb-[30px]">
            Have questions or thoughts? Please  <span className="text-primary">fill out...?</span>
          </h2>
          <p className="text-para-base 2xl:text-subtitle-md mb-[20px] md:mb-[50px] text-justify">
            Have questions, thoughts or want a group discount? Please fill out
            the form below. We love hearing from our students and care deeply<br />
            about your concerns and questions. We pride ourselves on responding
            to your message fast and in a manner that will leave you excited<br /> and
            grateful that you talked to us. You can send us a message about
            anything. Go ahead, try it!
          </p>
        </div>

        <div className="grid grid-cols-12 gap-5 md:gap-8 max-w-[1320px] px-[20px] mx-auto">
          <div className="col-span-12 md:col-span-8">
            <ContactForm />
          </div>

          <div className="col-span-4 flex flex-col justify-end h-auto">
            <div className="">
              <h2 className="text-para-lg 2xl:text-[24px] font-semibold mb-[10px] md:mb-[15px]">
                Follow Us
              </h2>
              <div className="h-[2px] bg-gradient-to-r from-purple-500 to-purple-100 mb-5 mx-auto"></div>
              <SocialMediaIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
