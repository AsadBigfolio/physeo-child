import React from "react";
import { cn } from "@/utils/classNames";

interface Props extends React.HTMLProps<HTMLTableElement> {}

interface TableComponents {
  Header: React.FC<React.HTMLProps<HTMLTableSectionElement>>;
  Body: React.FC<React.HTMLProps<HTMLTableSectionElement>>;
  Footer: React.FC<React.HTMLProps<HTMLTableSectionElement>>;
  Row: React.FC<React.HTMLProps<HTMLTableRowElement>>;
  Head: React.FC<React.HTMLProps<HTMLTableCellElement>>;
  Cell: React.FC<React.HTMLProps<HTMLTableCellElement>>;
  Caption: React.FC<React.HTMLProps<HTMLTableCaptionElement>>;
}

const Table: React.FC<Props> & TableComponents = ({ className, ...props }) => (
  <table
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
);

Table.displayName = "Table";

const TableHeader: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => <thead className={cn("[&_tr]:border-b", className)} {...props} />;
TableHeader.displayName = "TableHeader";
Table.Header = TableHeader;

const TableBody: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";
Table.Body = TableBody;

const TableFooter: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <tfoot
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";
Table.Footer = TableFooter;

const TableRow: React.FC<React.HTMLProps<HTMLTableRowElement>> = ({
  className,
  ...props
}) => (
  <tr
    className={cn(
      "border-b border-[#F5F6F7] text-[#343A40] font-[400] text-para-base transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted font-golos",
      className
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";
Table.Row = TableRow;

const TableHead: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <th
    className={cn(
      "h-10 px-2 bg-[#eaddff] text-purple-950 text-nowrap font-[400] text-left align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";
Table.Head = TableHead;

const TableCell: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <td
    // style={{ padding: "7px" }}
    className={cn(
      "p-3 align-middle text-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
);
TableCell.displayName = "TableCell";
Table.Cell = TableCell;

const TableCaption: React.FC<React.HTMLProps<HTMLTableCaptionElement>> = ({
  className,
  ...props
}) => (
  <caption
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";
Table.Caption = TableCaption;

export { Table };