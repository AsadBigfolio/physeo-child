"use client"
import Link from "next/link";
import SubscribeSection from "./SubscribeSection";
import FacebookIcon from "@/svgs/FacebookIcon";
import InstaIcon from "@/svgs/InstaIcon";
import LinkedinIcon from "@/svgs/LinkedinIcon";
import TiktokIcon from "@/svgs/TiktokIcon";
import TwitterIcon from "@/svgs/TwitterIcon";
import YoutubeIcon from "@/svgs/YoutubeIcon";
import { usePathname } from "next/navigation";

const aboutLinks = [
  {
    text: "Term of Service",
    href: "/terms-of-service",
  },
  {
    text: "Privacy Policy",
    href: "/privacy-policy",
  },
  // {
  //   text: "Refund Policy",
  //   href: "/refund-policy",
  // },
  {
    text: "FAQ",
    href: "/faq",
  },
  {
    text: "Contact Us",
    href: "/contact-us",
  },
];
const useFulLinks = [
  {
    text: "Certificates",
    href: "/certificates",
  },
  {
    text: "Titles",
    href: "/",
  },
  {
    text: "Merch",
    href: "https://www.supernaturalcon.com/merch",
    target: '_blank'
  },
  {
    text: 'Become a Paranormal Investigator (coming soon)',
    href: '#'
  },
  {
    text: 'Share your Encounter',
    href: '/contact-us'
  }
];

const socialLinks = [
  {
    icon: <InstaIcon />,
    href: "https://www.instagram.com/thesupernaturaluniversity",
  },
  {
    icon: <FacebookIcon />,
    href: "https://www.facebook.com/thesupernaturaluniversity",
  },
  {
    icon: <YoutubeIcon />,
    href: "https://www.youtube.com/@thesupernaturaluniversity",
  },
  {
    icon: <LinkedinIcon />,
    href: "https://www.linkedin.com/company/thesupernaturaluniversity",
  },
  {
    icon: <TwitterIcon />,
    href: "/",
  },
  {
    icon: <TiktokIcon />,
    href: "/",
  },
];

const Footer = () => {
  const pathname = usePathname();
  const shouldHideFooter = pathname.startsWith('/courses/');
  if (shouldHideFooter) {
    return
  }
  return (
    <div className='bg-black footer-ele'>
      <div className="max-w-[1320px] px-[20px] mx-auto">
        <div className="hidden md:block pt-[80px]">
          <SubscribeSection />
        </div>
        <div className="py-[24px] justify-between flex flex-col md:flex-row text-white md:pb-[20px] md:border-b-[1px] md:border-[#313131]">
          <div className="w-full md:w-[24%] 2xl:w-[30%] mb-[25px] md:mb-0-">
            <div className='flex justify-center md:justify-start'>
              <img
                src={"/TSU_LogoOK2.png"}
                alt="Super U Logo"
                className="w-[175px] h-[47px] md:h-[70px] md:w-[330px] ml-[-10px] md:ml-[-17px]"
            />
            </div>
            <p className="text-subtitle-md mt-[5px] block md:hidden">
              THE SUPERNATURAL UNIVERSITY IS NOT ACCREDITED BY AN ACCREDITING ORGANIZATION RECOGNIZED BY THE UNITED STATES SECRETARY OF EDUCATION
            </p>
            <div className="w-full flex justify-center md:justify-start md:flex-col md:w-[285px] mt-10">
              <h2 className="hidden md:block mb-4 text-title-lg ">Social Links</h2>
              <div className="flex justify-between md:justify-start gap-[30px] md:gap-5 2xl:gap-8 flex-wrap">
                {socialLinks.map((socialHandle, index) => (
                  <Link href={socialHandle.href} target='_blank' key={index}>
                    {socialHandle.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[15%] 2xl:w-[14%] text-para-lg flex flex-col 2xl:px-6 mb-[45px] md:mb-0">
            <h2 className="mb-2 text-title-lg">Useful Links</h2>
            <div className='flex flex-col gap-y-[10px]'>
              {useFulLinks.map((link, index) => {
                return (
                  <Link
                    href={link.href}
                    key={index}
                    className="underline text-subtitle-md opacity-70 "
                    target={link.target ?? ''}
                  >
                    {link.text}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-[15%] 2xl:w-[14%] text-para-lg flex flex-col 2xl:px-6 mb-[45px] md:mb-0">
            <h2 className="mb-2 text-title-lg">About</h2>
            <div className='flex flex-col gap-y-[10px]'>
              {aboutLinks.map((link, index) => {
                return (
                  <Link
                    href={link.href}
                    key={index}
                    className="underline text-subtitle-md opacity-70"
                  >
                    {link.text}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full md:w-[20%] 2xl:w-[28%] 2xl:px-11 mb-[45px] md:mb-0">
            <h2 className="mb-4 text-title-lg">Disclaimer</h2>
            <p className="text-subtitle-md opacity-70">
              This University is not designed to qualify you for jobs. If it does
              assist you in getting employment then please let us know at {' '}
              <span style={{ wordWrap: 'break-word' }} className="font-poppinsBold font-bold underline cursor-pointer">
                <Link href="mailto:Dean@TheSupernaturalUniversity.com">
                  Dean@TheSupernaturalUniversity.com
                </Link>
              </span>{" "}
              because that would be incredible.
            </p>
          </div>
          <div className="block md:hidden md:px-[20px]">
            <SubscribeSection />
          </div>

        </div>
        <div className="w-full flex justify-center md:pt-[50px] pb-[50px]">
          <div className="text-center text-subtitle-md text-white">
            <p className="mb-[30px] text-center text-subtitle-md hidden md:block">
              THE SUPERNATURAL UNIVERSITY IS NOT ACCREDITED BY AN ACCREDITING ORGANIZATION RECOGNIZED BY THE UNITED STATES SECRETARY OF EDUCATION
            </p>
            <div className='w-full flex justify-center'>
              <p className="mb-[30px] leading-6">
                Note: In the United States, many licensing authorities require
                accredited degrees as the basis for eligibility for licensing. In
                some cases, accredited colleges may not accept for transfer courses
                and degrees completed at unaccredited colleges, and some employers
                may require an accredited degree as a basis for eligibility for
                employment.
              </p>
            </div>
            <p>The Supernatural University © 2019 - 2025 All Rights Reserved. Developed by <span className='text-primary font-bold cursor-pointer hover:underline'>Bigfolio</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
