"use client";

import React, { ReactNode } from "react";
import { cn } from "@/utils/classNames";
import Breadcrumbs from "../BreadCrumbs";
import _Button, { type ButtonVariants } from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import { FaArrowLeft } from "react-icons/fa";

interface Breadcrumb {
  label: string;
  href: string;
}

interface Tab {
  label: string;
  url: string;
  onAction: (index: number) => void;
  active: boolean;
}

interface Button {
  content: ReactNode;
  onAction: () => void;
  variant: ButtonVariants;
  url?: string;
  disabled?: boolean;
  external?: boolean;
  loading?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backAction?: {
    onAction: () => void;
    url: string;
  };
  primaryAction?: Button;
  secondaryActions?: Button[];
  tabs?: Tab[];
}

interface PageProps {
  children: ReactNode;
  breadcrumbs: Breadcrumb[];
  fullWidth?: boolean;
  header?: PageHeaderProps;
  primaryAction?: Button;
}

const Page: React.FC<PageProps> = ({
  children,
  breadcrumbs,
  fullWidth = true,
  header,
  primaryAction,
}) => {
  const PrimaryAction = primaryAction && (
    <_Button
      disabled={primaryAction.disabled}
      variant={primaryAction.variant}
      onClick={primaryAction.onAction}
      loading={primaryAction.loading}
      type={primaryAction.type}
      as={primaryAction.url ? "a" : "button"}
      href={primaryAction.url}
      size={"md"}
    >
      {primaryAction.content}
    </_Button>
  );

  return (
    <div className={cn("p-[24px] mx-auto", { "max-w-[1356px]": !fullWidth })}>
      <div className="flex justify-between mb-[20px]">
        <Breadcrumbs items={breadcrumbs} />
        {PrimaryAction}
      </div>
      {header ? <PageHeader {...header} /> : null}
      {children}
    </div>
  );
};

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, subtitle, backAction, primaryAction, secondaryActions, tabs } =
    props;
  const isNotEmpty = Object.keys(props).filter(Boolean).length > 0;

  const BackButton = backAction && (
    <_Button
      variant="outline"
      className="size-[40px] p-0"
      as={backAction.url ? "a" : "button"}
      href={backAction.url}
      onClick={backAction.onAction}
    >
      <FaArrowLeft size={20} />
    </_Button>
  );

  const Title = title && (
    <h1 className="font-gilroy text-title-lg font-bold leading-normal">
      {title}
    </h1>
  );
  const PrimaryAction = primaryAction && (
    <_Button
      disabled={primaryAction.disabled}
      variant={primaryAction.variant}
      onClick={primaryAction.onAction}
      loading={primaryAction.loading}
      type={primaryAction.type}
    >
      {primaryAction.content}
    </_Button>
  );

  const SecondaryActions = secondaryActions && (
    <div className="space-x-2">
      {secondaryActions.map((action, index) => (
        <_Button
          disabled={action.disabled}
          key={index}
          variant={action.variant || "outline"}
          onClick={action.onAction}
          loading={action.loading}
          as={action.url ? "a" : "button"}
          external={action.external}
          href={action.url}
          type={action.type || "button"}
        >
          {action.content}
        </_Button>
      ))}
    </div>
  );

  const Tabs = tabs && (
    <div>
      {tabs.map((tab, index) => (
        <_Button
          as={tab.url ? "a" : "button"}
          href={tab.url}
          className={cn("hover:no-underline font-golos", {
            "border-b-[2px] rounded-none border-primary w-fit": tab.active,
            "text-[#b1b0b0]": !tab.active,
          })}
          key={index}
          variant="link"
          onClick={() => tab.onAction(index)}
        >
          {tab.label}
        </_Button>
      ))}
    </div>
  );

  return (
    <div className="mb-[40px]">
      {isNotEmpty && (
        <Card className="p-[24px] pb-0">
          <div className="flex justify-between mb-[24px]">
            <div className="flex items-center gap-2">
              {BackButton}
              {Title}
            </div>
            <div className="flex gap-2">
              {SecondaryActions}
              {PrimaryAction}
            </div>
          </div>
          {Tabs}
        </Card>
      )}
      {/* {tabs && <PageTabs {...tabs} />} */}
    </div>
  );
};

export default Page;
