"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon, TrashIcon } from "@radix-ui/react-icons"; // Import TrashIcon

import { cn } from "@/utils/classNames";

const Accordion = ({ items = [], onDelete, openValue, setOpenAccordion }) => {
  return (
    <AccordionPrimitive.Root type="single" collapsible value={openValue}>
      {items.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger
            onClick={() => {
              typeof item.onClick === "function" && item.onClick(item);
              setOpenAccordion && setOpenAccordion(openValue === `item-${index}` ? `item-${-1}` : `item-${index}`)
            }}
            onDelete={() => {
              typeof onDelete === "function" && onDelete(index); // Pass the index to onDelete
            }}
          >
            {item.label}
          </AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionPrimitive.Root>
  );
};

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, children, onDelete, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center data-[state=open]:bg-primary-light data-[state=open]:text-black justify-between pb-4 p-3 border rounded-full mb-4 px-3 cursor-pointer text-mainText font-medium transition-all hover:bg-primary-light [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <div className="flex items-center gap-2">
          <TrashIcon
            className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 hover:text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the accordion toggle
              onDelete();
            }}
          />
          <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };