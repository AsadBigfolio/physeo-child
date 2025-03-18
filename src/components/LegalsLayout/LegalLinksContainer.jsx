"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/classNames";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai"; // Import from react-icons

const legalLinks = [
  { title: "Privacy Policy", link: "/privacy-policy" },
  // { title: "Refund Policy", link: "/refund-policy" },
  { title: "Terms of Service", link: "/terms-of-service" },
  { title: "FAQs", link: "/faq" },
];

const LegalLinksContainer = () => {
  const pathName = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div className="flex w-full justify-center">
      {/* Desktop View */}
      <div className="h-[84px] p-5 bg-[#a197eb]/30 rounded-[10px] justify-between items-center hidden md:inline-flex">
        {legalLinks.map((link) => {
          const isActive = pathName === link.link;
          return (
            <Link
              key={link.link}
              href={link.link}
              className={cn(
                "text-xl font-medium  rounded-[10px] p-2.5 mx-3",
                isActive
                  ? "bg-[#491a8b] text-white flex items-center justify-center"
                  : "text-[#491a8b] hover:bg-[#491a8b]/10"
              )}
            >
              {link.title}
            </Link>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="w-full md:hidden relative">
        <div className='bg-[#a197eb]/30 p-2 rounded-[10px]'>
          <button
            onClick={toggleDropdown}
            className="w-full flex items-center justify-between p-4 bg-[#491a8b] text-white rounded-[10px]"
          >
            <span>{legalLinks.find((link) => link.link === pathName).title}</span>
            <AiOutlineDown
              className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                }`}
              size={20}
            />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="mt-2 bg-white rounded-[10px] p-4 space-y-2 absolute w-full z-20">
            {legalLinks.map((link) => {
              const isActive = pathName === link.link;
              return (
                <Link
                  key={link.link}
                  href={link.link}
                  className={cn(
                    "block text-lg font-medium font-['Syne'] rounded-[10px] px-4 py-2",
                    isActive
                      ? "bg-[#491a8b] text-white"
                      : "text-[#491a8b] hover:bg-[#491a8b]/10"
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalLinksContainer;
