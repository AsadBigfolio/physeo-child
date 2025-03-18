"use client";

import React from "react";
import Header from "./Header";
import Body from "./Body";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table } from "@/components/UI/Table";
import useQueryParams from "@/hooks/useQueryParams";
import ScrollArea from "@/components/UI/ScrollArea";
import { type ResourceListProps } from "./types";
import Footer from "./Footer";
import Pagination from "./Pagination";

const ResourceList: React.FC<ResourceListProps> = ({
  columns,
  data = [],
  sumOfRows = [],
  totalRows = 0,
  limit,
  extraHeaders = [],
  name = "Rows",
  totalPages,
  pagination = true,
  hideHeader = false,
  limitOptions = [25, 50, 100],
  headerSticky = true,
  footerSticky = true,
  scroll = "horizontal",
  selection = {
    enabled: false,
    keyAccessor: "id",
    selected: [],
  },
  onPrevPage,
  onNextPage,
  onLimitChange,
  currentPage,
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const params = useQueryParams();
  const page = currentPage || Number(params.get("page")) || 1;
  const headerGroups = table.getHeaderGroups();
  const rowModel = table.getRowModel();

  const headerMarkup = (
    <Header
      hideHeader={hideHeader}
      columns={columns}
      extraHeaders={extraHeaders}
      headerGroups={headerGroups}
      selection={selection}
      headerSticky={headerSticky}
      rowModel={rowModel}
    />
  );

  const bodyMarkup = (
    <Body rowModel={rowModel} columns={columns} selection={selection} />
  );

  const footerMarkup = (
    <Footer
      columns={columns}
      sumOfRows={sumOfRows}
      footerSticky={footerSticky}
    />
  );

  const paginationMarkup = (
    <Pagination
      enabled={pagination}
      data={data}
      totalRows={totalRows}
      limit={limit || Number(params.get("limit")) || 25}
      name={name}
      totalPages={totalPages}
      limitOptions={limitOptions}
      footerSticky={footerSticky}
      onPrevPage={onPrevPage}
      onNextPage={onNextPage}
      onLimitChange={onLimitChange}
      page={page}
    />
  );

  return (
    <div className="space-y-2 h-full">
      <div
        className="h-full- rounded-lg rounded-b-xl overflow-hidden"
        style={{
          boxShadow: `0px -2px 4px 0px rgba(0, 0, 0, 0.050)`,
        }}
      >
        <ScrollArea orientation={scroll} className="w-full h-full">
          <Table className="h-full w-full">
            {headerMarkup}
            {bodyMarkup}
            {footerMarkup}
          </Table>
        </ScrollArea>
        {paginationMarkup}
      </div>
    </div>
  );
};

export default ResourceList;
