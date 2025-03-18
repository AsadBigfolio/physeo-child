import { Row } from "@tanstack/react-table";

export type Column = {
  header: string | ((props: any) => React.ReactNode);
  accessorKey: string;
  align?: "left" | "right";
  background?: string;
  formatCurrency?: boolean;
  formatPercentage?: boolean;
  cell?: string | ((row: any) => React.ReactNode);
  width?: string;
};

export type ExtraHeader = {
  header: React.ReactNode;
  colSpan: number;
  background?: string;
};

export type Selection = {
  enabled?: boolean;
  onRowSelect?: (accessor: string) => void;
  onAllRowSelect?: (rows: any[]) => void;
  keyAccessor: string;
  selected: any[];
  render?: (
    row: Row<any>,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
    selected: boolean
  ) => React.ReactNode;
};

export type ResourceListProps = {
  columns: Column[];
  data?: any[];
  sumOfRows?: string[];
  totalRows?: number;
  limit?: number;
  extraHeaders?: ExtraHeader[];
  name?: string;
  totalPages?: number;
  pagination?: boolean;
  limitOptions?: number[];
  headerSticky?: boolean;
  footerSticky?: boolean;
  hideHeader?: boolean;
  selection?: Selection;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onLimitChange?: (value: string) => void;
  currentPage?: number;
  scroll?: "vertical" | "horizontal" | "both";
};
