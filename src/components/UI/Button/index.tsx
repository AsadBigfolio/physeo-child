import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useFormStatus } from "react-dom";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import Spinner from "@/components/UI/Spinner";

const buttonVariants = cva(
  "inline-flex font-poppins items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007DFC]/30 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white bg-[#007DFC] shadow hover:bg-[#0069d9] active:bg-[#0056b3]",
        destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800",
        outline: "border border-[#007DFC] text-[#007DFC] bg-transparent hover:bg-[#007DFC]/10 active:bg-[#007DFC]/20",
        secondary: "bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200 active:bg-gray-300",
        ghost: "text-[#007DFC] hover:bg-[#007DFC]/10 active:bg-[#007DFC]/20",
        link: "text-[#007DFC] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-lg",
        md: "h-10 px-5 text-[14px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>["variant"];
export type ButtonSizes = VariantProps<typeof buttonVariants>["size"];

export type ButtonProps<T extends React.ElementType> = {
  as?: T;
  asChild?: boolean;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  loading?: boolean;
  external?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const Button = <T extends React.ElementType = "button">({
  className,
  variant,
  size,
  asChild = false,
  href = "",
  as,
  loading,
  children,
  external = false,
  type,
  ...props
}: ButtonProps<T>) => {
  const Comp = asChild ? Slot : as === "a" ? Link : as || "button";
  const { pending } = useFormStatus();
  const _loading = typeof loading === "boolean" ? loading : pending;

  return (
    <Comp
      target={external ? "_blank" : undefined}
      className={cn(buttonVariants({ variant, size, className }), {
        "pointer-events-none": _loading // Disable pointer events during loading
      })}
      href={href}
      type={type}
      {...props}
    >
      {_loading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner />
          {children && <span className="opacity-0">{children}</span>}
        </div>
      ) : (
        children
      )}
    </Comp>
  );
};

Button.displayName = "Button";

export default Button;