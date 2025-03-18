import { forwardRef, ReactNode } from "react";
import { cn } from "@/utils/classNames";
import Button, { ButtonVariants } from "../Button";

interface Button {
  content: ReactNode;
  onAction: () => void;
  variant: ButtonVariants;
  url?: string;
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
  primaryAction?: Button;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, title, primaryAction, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-5 rounded-xl border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <div className={cn("flex justify-between w-full items-center")}>
        {title ? (
          <h3 className="font-syne text-lg mb-3 font-semibold leading-normal">
            {title}
          </h3>
        ) : null}
        {primaryAction ? (
          <Button
            variant={primaryAction.variant}
            onClick={primaryAction.onAction}
            as={primaryAction.url ? "a" : "button"}
            href={primaryAction.url}
          >
            {primaryAction.content}
          </Button>
        ) : null}
      </div>
      {props.children}
    </div>
  )
);

Card.displayName = "Card";

export default Card;
