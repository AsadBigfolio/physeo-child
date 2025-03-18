import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(
  ...inputs: (string | Record<string, boolean> | null | undefined | boolean)[]
): string {
  // Use twMerge to merge the class names
  return twMerge(clsx(...inputs));
}

export { cn };
