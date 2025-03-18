import { cn } from "@/utils/classNames"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#f1f1f1]", className)}
      {...props} />
  );
}

export { Skeleton }
