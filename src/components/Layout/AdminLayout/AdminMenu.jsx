import { cn } from "@/utils/classNames";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import {
  MdPlayLesson,
  MdManageAccounts,
  MdWebStories,
  MdOutlineRateReview,
} from "react-icons/md";
import { LuFileBadge } from "react-icons/lu";
import { FaFileSignature } from "react-icons/fa6";
import { FaBlogger, FaRegNewspaper } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Separator } from "@/components/UI/Separator";
import Button from "@/components/UI/Button";
import { IoLogOut } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { RiAccountPinCircleFill, RiDiscountPercentFill } from 'react-icons/ri';

const menuItems = [
  {
    key: "students",
    label: "Students",
    href: "/admin/students",
    icon: <MdManageAccounts />,
  },
  {
    key: "Modules",
    label: "Modules",
    href: "/admin/modules",
    icon: <MdPlayLesson />,
  },
  {
    key: "Blogs",
    label: "Blog",
    href: "/admin/blog",
    icon: <FaBlogger />,
  },
  {
    key: "story",
    label: "Our Team",
    href: "/admin/our-team",
    icon: <MdWebStories />,
  },
  {
    key: "Badge",
    label: "Badges",
    href: "/admin/badges",
    icon: <LuFileBadge />,
  },
  {
    key: "Testimonials",
    label: "Testimonials",
    href: "/admin/testimonial",
    icon: <MdOutlineRateReview />,
  },
  {
    key: "mediaManager",
    label: "Media Manager",
    href: "/admin/files",
    icon: <FaFileSignature />,
  },
  {
    key: "newsLetter",
    label: "News Letter",
    href: "/admin/news-letter",
    icon: <FaRegNewspaper />,
  },
  {
    key: "discountCodes",
    label: "Discount Codes",
    href: "/admin/discount-codes",
    icon: <RiDiscountPercentFill />,
  },
  {
    key: "influencer",
    label: "Influencer",
    href: "/admin/influencer",
    icon: <RiAccountPinCircleFill />,
  },
];

const handleLogout = () => {
  signOut({ callbackUrl: "https://superu-e40ffcfce423.herokuapp.com" });
};

function AdminMenu({ collapsed, setCollapsed }) {
  return (
    <div
      className={cn(
        "bg-white h-screen z-20 flex flex-col p-3 px-5 justify-between transition-all relative shadow-lg border-r border-gray-100",
        collapsed ? "w-[90px]" : "w-[250px]"
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4">
          <Link href="/admin">
            <img
              src="/SuperULogoMain.png"
              alt="logo"
              className={cn("object-contain transition-all", collapsed ? "w-12" : "w-40")}
            />
          </Link>
        </div>
        <div
          className={cn(
            "absolute right-[-18px] z-50 cursor-pointer bg-white hover:bg-primary/10 rounded-full shadow-md border border-primary/20 p-2 text-lg top-[10vh] transition-all duration-300 transform",
            collapsed ? "rotate-180" : "rotate-0"
          )}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <FaChevronLeft className="text-primary" />
        </div>
        <div
          className={cn(
            "border-t border-gray-200 flex flex-col pt-8",
            collapsed ? "items-center" : "items-start"
          )}
        >
          {menuItems.map((item, index) => (
            <MenuItem item={item} key={index} collapsed={collapsed} />
          ))}
          <Separator />
          <div className="mt-5 w-full ml-3">
            <Button
              onClick={handleLogout}
              size="sm"
              variant="outline"
              className="space-x-2 border-primary text-primary hover:bg-primary/10 hover:text-primary"
            >
              <IoLogOut />
              {!collapsed && <span>Sign out</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ item, collapsed }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const Trigger = collapsed ? TooltipTrigger : "div";

  return (
    <div className="mb-3 flex flex-col w-full" key={item.key}>
      <Tooltip key={item.title || item.label} delayDuration={0}>
        <Trigger asChild>
          <div className="flex flex-col w-full">
            <Link
              href={item.href || ""}
              className={cn(
                "px-4 py-2 hover:bg-[#007DFC]/10 rounded-lg cursor-pointer flex justify-between items-center w-full transition-all",
                isActive && "bg-[#007DFC]/20 text-primary font-medium",
                collapsed && "justify-center"
              )}
              onClick={() => setOpen(!open)}
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "transition-all",
                    collapsed ? "text-[22px] text-primary" : "text-[20px] mr-3 text-primary"
                  )}
                >
                  {item?.icon}
                </span>
                <p
                  className={cn(
                    "transition-all text-sm",
                    collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
                  )}
                >
                  {item.label}
                </p>
              </div>
              {!collapsed && item.children && (
                <FaChevronDown
                  size={12}
                  className={cn(
                    "text-gray-500 transition-transform",
                    open && "rotate-180"
                  )}
                />
              )}
            </Link>
            {!collapsed && item.children && (
              <div
                className={cn(
                  "flex ml-3 flex-col transition-all duration-300",
                  {
                    "max-h-0 opacity-0 pointer-events-none": !open,
                    "max-h-[1000px] opacity-100 pointer-events-auto": open,
                  }
                )}
              >
                {item.children.map((child, index) => (
                  <MenuItem item={child} key={index} />
                ))}
              </div>
            )}
          </div>
        </Trigger>
        {collapsed && (
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );
};

export default AdminMenu;