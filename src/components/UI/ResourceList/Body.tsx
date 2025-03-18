import { flexRender, Row, RowModel } from "@tanstack/react-table";
import { Table } from "@/components/UI/Table";
import { Selection, type Column } from "./types";
import { Checkbox } from "@/components/UI/Checkbox";
import {
  formatCurrency as _formatCurrency,
  formatPercentage as _formatPercentage,
} from "@/utils/format";
import { cn } from "@/utils/classNames";

const Body = ({
  rowModel,
  columns,
  selection,
}: {
  rowModel: RowModel<any>;
  columns: Column[];
  selection: Selection;
}) => {
  const rowSelectHandler = (id: string) => {
    if (typeof selection.onRowSelect === "function") {
      selection.onRowSelect(id);
    }
  };

  const renderSelection = (row: Row<any>) => {
    const onClick = () => rowSelectHandler(row.original[selection.keyAccessor]);

    const selected =
      selection.selected?.includes(row.original[selection.keyAccessor]) ||
      false;

    if (selection.render) {
      return selection.render(row, onClick, selected);
    }

    // Default rendering logic
    return <Checkbox checked={selected} onClick={onClick} />;
  };

  const { rows } = rowModel;

  return (
    <Table.Body className="bg-white">
      {rows.length ? (
        rows.map((row, i) => (
          <Table.Row
            key={row.id + i}
            data-state={row.getIsSelected() && "selected"}
          >
            {selection.enabled && (
              <Table.Cell>{renderSelection(row)}</Table.Cell>
            )}
            {row.getVisibleCells().map((cell, i) => {
              const column = columns[cell.column.getIndex()];
              const {
                align,
                formatCurrency,
                formatPercentage,
                cell: cellRender,
              } = column;
              const isRightAligned = align === "right";

              let value = cell.getValue() as any;

              if (formatCurrency) {
                value = _formatCurrency(value || 0);
              } else if (formatPercentage) {
                value = _formatPercentage(value || 0);
              } else {
                value = value || "-";
              }

              return (
                <Table.Cell
                  className={cn("", { "text-right": isRightAligned })}
                  key={cell.id + i}
                >
                  {cellRender
                    ? flexRender(cell.column.columnDef.cell, cell.getContext())
                    : value}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))
      ) : (
        <Table.Row className="bg-white">
          <Table.Cell colSpan={columns.length + 1} className="h-24 text-center">
            No results.
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  );
};
export default Body;
