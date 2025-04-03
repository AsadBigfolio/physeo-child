"use client";
import ResourceList from "@/components/UI/ResourceList";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Badge from "@/components/UI/Badge";
import SearchBar from "@/components/InputFields/SearchBar";
import useQueryParams from "@/hooks/useQueryParams";
import Link from "next/link";
import { toast } from "sonner";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import { trpc } from "@/utils/trpcClient";
import { useRouter } from "next/navigation";

export default function Table({ data, totalPages, currentPage, totalRows }) {
  const router = useRouter();
  const params = useQueryParams();
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [singleBadge, setSingleBadge] = useState([] as any);
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  const { mutate: deleteMutation, isPending: deleteLoading } =
    trpc.badge.delete.useMutation({
      onSuccess: (data) => {
        toast.success(data?.message);
        router.refresh();
      },
    });
  const columns = [
    {
      header: "Badge title",
      accessorKey: "title",
      cell: ({ row }) => <span>{row.original.title}</span>,
    },
    {
      header: "Icon",
      accessorKey: "icon",
      width: "100px",
      cell: ({ row }) => (
        <img
          height={50}
          width={50}
          className="object-cover rounded"
          src={row.original.image?.src}
          alt={row.original.title}
        />
      ),
    },
    {
      header: "Badge description",
      accessorKey: "description",
      cell: ({ row }) => {
        const truncateText = (text, charLimit) => {
          return text?.length > charLimit ? text.slice(0, charLimit) + "..." : text;
        };

        return <span>{truncateText(row.original.description, 20)}</span>;
      },
    },    
    {
      header: "Associated Course",
      accessorKey: "associatedWith",
      cell: ({ row }) => <span>{row.original.course?.title ?? ""}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) =>
        row.original.status ? (
          <Badge
            className=""
            tone={row.original.status === "published" ? "success" : "warning"}
          >
            {row.original.status}
          </Badge>
        ) : (
          "-"
        ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link
            className="p-2 rounded-full hover:bg-gray-200"
            title="Edit"
            href={`badges/${row.original._id}`}
          >
            <MdEdit />
          </Link>
          <button
            className="p-2 rounded-full hover:bg-gray-200 text-red-500"
            title="Delete"
            onClick={() => {
              setBulkDeleteModal(true);
              setSingleBadge([row.original._id]);
            }}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ),
    },
  ];

  const handleSearch = (searchString) => {
    if (searchString) {
      params.set("search", searchString);
      params.delete("page");
      params.delete("limit");
    } else {
      params.delete("search");
    }
    params.update();
  };
  const handleSelection = (ids) => {
    setSelectedRows((prevSelectedRows) => {
      if (Array.isArray(ids)) {
        const allIdsSelected = ids.every((id) =>
          prevSelectedRows?.includes(id)
        );
        if (allIdsSelected) {
          return prevSelectedRows.filter((id) => !ids.includes(id));
        } else {
          return [...new Set([...prevSelectedRows, ...ids])];
        }
      } else {
        const isSelected = prevSelectedRows.includes(ids);
        return isSelected
          ? prevSelectedRows.filter((id) => id !== ids)
          : [...prevSelectedRows, ids];
      }
    });
  };

  function handleBulkDelete() {
    try {
      selectedRows.length
        ? deleteMutation(selectedRows)
        : deleteMutation(singleBadge);
      setBulkDeleteModal(false);
      setSelectedRows([]);
      setSingleBadge([]);
    } catch (error) {
      toast.error(`Failed to delete badges: ${error.message}`);
    }
  }

  return (
    <div>
      <div className="flex space-x-4 justify-between mb-4">
        <SearchBar
          value={params.get("search") || ""}
          containerClassName="w-[400px]"
          onChange={(searchString) => handleSearch(searchString)}
          placeholder="Search Badges by title."
        />
        {selectedRows.length > 0 && (
          <Button
            onClick={() => setBulkDeleteModal(true)}
            type="button"
            variant={"default"}
            className="rounded-md"
          >
            Delete Selected
          </Button>
        )}
      </div>
      <ResourceList
        selection={{
          enabled: true,
          keyAccessor: "_id",
          selected: selectedRows,
          onAllRowSelect: (ids) => handleSelection(ids),
          onRowSelect: (id) => handleSelection(id),
        }}
        columns={columns}
        data={data ?? []}
        totalPages={totalPages}
        currentPage={currentPage}
        totalRows={totalRows}
      />
      <Modal
        title="Are you sure you want to delete?"
        subtitle=""
        onClose={() => setBulkDeleteModal(false)}
        open={bulkDeleteModal || deleteLoading}
        actions={[
          {
            content: "No",
            onAction: () => setBulkDeleteModal(false),
            loading: false,
            variant: "outline",
          },
          {
            content: "Yes",
            onAction: handleBulkDelete,
            loading: deleteLoading,
          },
        ]}
      />
    </div>
  );
}
