import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useFormStatus } from "react-dom";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/classNames";
import Link from "next/link";
import Spinner from "@/components/UI/Spinner";

const buttonVariants = cva(
  "inline-flex font-poppins items-center justify-center p-5 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: " text-white bg-primary shadow hover:bg-primary/90 ",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input text-primary bg-background shadow-sm hover:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 py-2",
        sm: "h-8 rounded-md  py-1 text-xs",
        lg: "h-10 rounded-md py-3 text-lg",
        md: "h-9 rounded-md px-5 py-2 text-[14px]",
        icon: "h-9 w-9",
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

// Define the ButtonProps type
export type ButtonProps<T extends React.ElementType> = {
  as?: T;
  asChild?: boolean;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  loading?: boolean;
  external?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

// Define the Button component
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
      className={cn(buttonVariants({ variant, size, className }))}
      href={href}
      type={type}
      {...props}
    >
      {_loading ? (
        <Spinner
          color={
            variant === "outline" || variant === "secondary" ? "black" : "white"
          }
        />
      ) : (
        children
      )}
    </Comp>
  );
};

Button.displayName = "Button";

export default Button;
