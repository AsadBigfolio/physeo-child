import { cn } from "@/utils/classNames";
import { Table } from "@/components/UI/Table";
import { Checkbox } from "@/components/UI/Checkbox";
import { flexRender, HeaderGroup, RowModel } from "@tanstack/react-table";
import { Column, ExtraHeader, Selection } from "./types";
import { MouseEventHandler } from "react";

interface Props {
  columns: Column[];
  headerGroups: HeaderGroup<any>[];
  extraHeaders: ExtraHeader[];
  selection: Selection;
  rowModel: RowModel<any>;
  headerSticky: boolean;
  hideHeader: boolean;
}
const Header: React.FC<Props> = ({
  columns,
  headerGroups,
  extraHeaders,
  selection,
  rowModel,
  headerSticky,
  hideHeader,
}) => {
  const allRowSelectHandler = () => {
    if (typeof selection.onAllRowSelect === "function") {
      selection.onAllRowSelect(
        rowModel.rows.map((row) => row.original[selection.keyAccessor])
      );
    }
  };
  return (
    <Table.Header className={cn({ "sticky top-0 z-40": headerSticky })}>
      {extraHeaders?.length > 0 && (
        <Table.Row className="border-none">
          {extraHeaders.map(
            ({ header, colSpan, background = "#E9ECEF" }, i) => (
              <Table.Head
                key={`extra-header${i}`}
                colSpan={colSpan}
                className="border-none px-0 m-0 text-center"
                style={{ backgroundColor: background }}
              >
                {header}
              </Table.Head>
            )
          )}
        </Table.Row>
      )}

      {headerGroups.map((headerGroup) => (
        <Table.Row
          className="m-0 border-none"
          style={{ background: "#ebddff" }}
          key={headerGroup.id}
        >
          {selection.enabled && (
            <Table.Cell className="border-none w-[30px]">
              <Checkbox
                checked={selection.selected?.length === rowModel.rows.length}
                onClick={allRowSelectHandler}
              />
            </Table.Cell>
          )}
          {headerGroup.headers.map((header) => {
            const column = columns[header.column.getIndex()] || {};
            const { align, background, width } = column;
            const isRightAligned = align === "right";
            return (
              <Table.Head
                style={{ backgroundColor: background, width }}
                className={cn(
                  "border-none",
                  {
                    "text-right": isRightAligned,
                    "h-0 p-0": hideHeader,
                  }
                  // `w-[${width || "auto"}]`
                )}
                key={header.id}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Table.Head>
            );
          })}
        </Table.Row>
      ))}
    </Table.Header>
  );
};
export default Header;
