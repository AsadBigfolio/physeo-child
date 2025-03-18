import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/UI/Dialog";
import Button, { ButtonVariants } from "@/components/UI/Button";
import { cn } from "@/utils/classNames";

interface Action {
  content: string;
  onAction: () => void;
  variant?: ButtonVariants;
  type?: "submit" | "button";
  loading: boolean,
}

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  subtitle?: string;
  actions?: Action[];
  children?: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose = () => {},
  title,
  subtitle = "",
  actions = [],
  children,
  className,
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className={cn(
            "max-w-[930px] max-h-[90%] overflow-auto h-[auto] bg-white",
            className
          )}
        >
          <DialogHeader>
            <DialogTitle className="font-golos font-bold leading-normal non-italic text-base tracking-[0.3px]">
              {title}
            </DialogTitle>
            <DialogDescription className="font-golos text-black">
              {subtitle}
            </DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter className="items-center">
            {actions.map(
              (
                { content, onAction, variant = "default", type = "button", loading },
                i
              ) => (
                <Button
                  type={type}
                  key={content + i}
                  onClick={onAction}
                  variant={variant}
                  className="w-[113px]"
                  loading={loading}
                >
                  {content}
                </Button>
              )
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
