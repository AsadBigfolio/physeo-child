'use client'

import Link from "next/link";
import { cn } from "@/utils/classNames";
import React from "react";
import { usePathname } from "next/navigation";

const Breadcrumbs = ({ items = [] }) => {
  // const url = new URL(headers().get("x-url"));

  const pathname = usePathname()

  return (
    <div className="flex gap-1 xl:gap-2 font-gilroy xl:font-gilroy font-semibold text-para-base xl:text-title-lg tracking-wider">
      {items?.map(({ destination, active, label }, index) => (
        <span key={destination} className="text-[#ADB5BD] flex gap-1 xl:gap-2 items-center">
          <Link
            className={cn("hover:underline", {
              "text-[#212529]": pathname === destination || active,
            })}
            href={`${destination}`}
          >
            {label}
          </Link>
          {index !== items.length - 1 && (
            <span className="scale-[0.80] xl:scale-100">
              <svg
                width={15}
                height={15}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
          )}
        </span>
      ))}
    </div>
  );
};
export default Breadcrumbs;
