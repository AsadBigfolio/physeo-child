import { cn } from "@/utils/classNames";
import { Table } from "@/components/UI/Table";
import { Column } from "./types";
import React from "react";

interface Props {
  columns: Column[];
  sumOfRows: any[];
  footerSticky: boolean;
}

const Footer: React.FC<Props> = ({ columns, footerSticky, sumOfRows }) => {
  return (
    <Table.Footer
      className={cn("bg-white border-t-[1px]", {
        "sticky bottom-0": footerSticky,
      })}
    >
      <Table.Row className="">
        {sumOfRows.map((each, i) => {
          const isRightAligned = columns[i]?.align === "right";
          return (
            <Table.Cell
              key={each + i}
              className={cn("text-[#007D19] text-para-base py-3 font-medium", {
                "text-right": isRightAligned,
              })}
            >
              {each}
            </Table.Cell>
          );
        })}
      </Table.Row>
    </Table.Footer>
  );
};
export default Footer;
