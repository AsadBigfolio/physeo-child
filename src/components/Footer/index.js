"use client"
import React, { useState } from "react";
import { PiInstagramLogoLight, PiYoutubeLogoLight, PiTwitterLogoLight } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";
import Link from 'next/link';
import { trpc } from '@/utils/trpcClient';
import { toast } from 'sonner';
import Image from 'next/image';

const Spinner = ({ color = 'white' }) => {
  return (
    <svg
      fill={color}
      className="spinner"
      width={20}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.542 1.487A21.507 21.507 0 00.5 22c0 11.874 9.626 21.5 21.5 21.5 9.847 0 18.364-6.675 20.809-16.072a1.5 1.5 0 00-2.904-.756C37.803 34.755 30.473 40.5 22 40.5 11.783 40.5 3.5 32.217 3.5 22c0-8.137 5.3-15.247 12.942-17.65a1.5 1.5 0 10-.9-2.863z"></path>
    </svg>
  );
};
const socialLinks = [
  {
    icon: "/social/insta.svg",
    href: "https://www.instagram.com/thesupernaturaluniversity",
  },
  {
    icon: "/social/fb.svg",
    href: "https://www.facebook.com/thesupernaturaluniversity",
  },
  {
    icon: "/social/youtube.svg",
    href: "https://www.youtube.com/@thesupernaturaluniversity",
  },
  {
    icon: "/social/linkdin.svg",
    href: "https://www.linkedin.com/company/thesupernaturaluniversity",
  },
  {
    icon: "/social/thread.svg",
    href: "/",
  }
];
const Footer = () => {
  const [email, setEmail] = useState("");

  const createEmailUserMutation = trpc.newsLetter.createEmailUser.useMutation({
    onSuccess: (data) => {
      toast.success(data?.message)
    },
    onError: (error) => {
      toast.error(error?.message)
    }
  });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await createEmailUserMutation.mutateAsync({ email });
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };
  return (
    <footer className="bg-[#EFF4F8] text-mainText pt-[40px] pb-[32px]">
      <div className='max-w-[1320px] mx-auto'>
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <img src={"/new/logo.jpg"} alt="Physeo Logo" className="w-[147px] h-[36px]" />
              </Link>
            </div>
            <div className='flex gap-[8px] items-center mt-[24px]'>
              <div className='rounded-full bg-[#E3ECF6] size-[36px] flex justify-center items-center'>
                <Image src={"/social/sms.svg"} alt="Physeo Logo" height={20} width={20} />
              </div>
              <p className='text-[15px] leading-[20px] font-medium text-mainText'>examplemail@gmail.com</p>
            </div>
            <div className='flex gap-[8px] items-center mt-[16px]'>
              <div className='rounded-full bg-[#E3ECF6] size-[36px] flex justify-center items-center'>
                <Image src={"/social/call.svg"} alt="Physeo Logo" height={20} width={20} />
              </div>
              <p className='text-[15px] leading-[20px] font-medium text-mainText'>(438) 347 667 665</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col gap-[20px]'>
            <h3 className="font-semibold text-[16px] leading-[24px]">Quick Links</h3>
            <ul className="space-y-[16px] font-[450] text-[16px] leading-[20px]">
              <li>Home</li>
              <li>Courses</li>
              <li>Dashboard</li>
              <li>Story</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Courses */}
          <div className='flex flex-col gap-[20px]'>
            <h3 className="font-semibold text-[16px] leading-[24px]">Courses</h3>
            <ul className="space-y-[16px] font-[450] text-[16px] leading-[20px]">
              <li>USMLE - Preclinical</li>
              <li>USMLE - Clinical</li>
              <li>Physician Assistant</li>
              <li >Doctor of Dental Surgery</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className='flex flex-col gap-[12px]'>
            <div>
              <h3 className="font-semibold text-[16px] leading-[24px]">Stay in the Loop</h3>
              <p className='muted-description'>We won't spam you, we promise!</p>
            </div>
            <form className='flex gap-[8px] justify-between' onSubmit={handleSubscribe}>
              <div className="flex items-center bg-white !w-full rounded-full overflow-hidden shadow-sm">
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 h-[36px] text-sm focus:outline-none"
                />
                <button className='p-1' type='submit'>
                  <div className="size-[36px] rounded-full flex items-center justify-center text-white font-bold">
                    {createEmailUserMutation.isPending ? <div className='mx-3'><Spinner color='#007DFC' /></div> : <img src="/new/arrowButton.svg" alt='arrowButton' />}
                  </div>
                </button>
              </div>
            </form>
            <div className="flex gap-[12px] ">
              {socialLinks.map((link, index) => (
                <Link href={link.href} target='_blank' key={index} className='rounded-full bg-[#E3ECF6] size-[36px] flex justify-center items-center'>
                  <Image src={link.icon} alt="Physeo Logo" height={20} width={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <hr className="mb-[16px] mt-[84px] border-[#BABABA]" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between leading-[20px] font-[450] text-[15px] text-primary-muted">
          <p>
            © 2025 Physeo. All right reserved
          </p>

          <div className="flex space-x-4">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className='bg-[#E1E9F0] flex flex-col gap-[4px] text-center mt-[24px] text-primary-muted text-[12px] py-[14px] leading-[20px]'>
          <p>PHYSEO IS NOT ACCREDITED BY AN ACCREDITING ORGANIZATION RECOGNIZED BY THE UNITED STATES SECRETARY OF EDUCATION</p>
          <p>Note: In the United States, many licensing authorities require accredited degrees as the basis for eligibility for licensing. In some cases, accredited colleges may not accept for transfer <br /> courses and degrees completed at unaccredited colleges, and some employers may require an accredited degree as a basis for eligibility for employment.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
