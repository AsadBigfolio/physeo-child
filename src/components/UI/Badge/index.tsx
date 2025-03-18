import { cn } from "@/utils/classNames";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const badgeVariants = cva(
  "inline-block px-4 rounded-md py-[1px] text-sm font-medium border-[1px]",
  {
    variants: {
      tone: {
        success: "bg-green-50 text-green-800 border-green-200",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
        critical: "bg-red-50 text-red-800 border-red-200",
      },
    },
    defaultVariants: {
      tone: "success",
    },
  }
);

export type BadgeTones = VariantProps<typeof badgeVariants>["tone"];

interface props {
  children: React.ReactNode;
  tone: BadgeTones;
  className: string;
}

const Badge = ({ children, tone, className }: props) => {
  return (
    <div className={cn(badgeVariants({ tone }), className)}>{children}</div>
  );
};

export default Badge;
