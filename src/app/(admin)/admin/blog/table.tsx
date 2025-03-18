"use client"

import ResourceList from '@/components/UI/ResourceList'
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { AiOutlineFilePdf, AiOutlinePlayCircle } from 'react-icons/ai';
import Badge from '@/components/UI/Badge';
import SearchBar from '@/components/InputFields/SearchBar';
import useQueryParams from '@/hooks/useQueryParams';
import Link from 'next/link';
import { trpc } from '@/utils/trpcClient';
import { toast } from 'sonner';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';

export default function Table({ data, totalPages, currentPage, totalRows }) {
    const params = useQueryParams();
    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState([] as any);
    const [singleBlog, setSingleBlog] = useState([] as any);
    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
    const { mutate: deleteMutation, isPending: deleteLoading } =
        trpc.blog.delete.useMutation({
            onSuccess: (data) => {
                toast.success(data?.message);
                router.refresh();
            }
        });
    const renderIcon = (file) => {
        if (file?.type?.includes("video")) {
            return (
                <div className="rounded-md h-12 w-12 flex justify-center items-center bg-blue-50">
                    <AiOutlinePlayCircle className="text-8xl text-blue-400" />
                </div>
            );
        }
        if (file?.type?.includes("pdf")) {
            return (
                <div className="rounded-md h-12 w-12 flex justify-center items-center bg-red-50">
                    <AiOutlineFilePdf className="text-8xl text-red-700" />
                </div>
            );
        }
        return (
            <div className="text-center rounded-lg overflow-hidden">
                <img
                    src={file?.src}
                    className="rounded-md h-12 w-12 object-cover"
                    alt="img"
                />
            </div>
        );
    };
    const columns = [
        {
            header: "",
            accessorKey: "imgUrl",
            width: "100px",
            cell: ({ row }) => (
                <div>{renderIcon(row?.original?.image)}</div>
            ),
        },
        {
            header: "Title",
            accessorKey: "title",
        },
        {
            header: "Category",
            accessorKey: "category",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => (
                row.original.status ? <Badge
                    className=""
                    tone={
                        row.original.status === "published" ? "success" : "warning"
                    }
                >
                    {row.original.status}
                </Badge> : '-'
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
                        href={(`blog/${row.original._id}`)}
                    >
                        <MdEdit />
                    </Link>
                    <button
                        className="p-2 rounded-full hover:bg-gray-200 text-red-500"
                        title="Delete"
                        onClick={() => {
                            setBulkDeleteModal(true)
                            setSingleBlog([row.original._id])
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
            params.delete("search")
        }
        params.update();
    };
    const handleSelection = (ids) => {
        setSelectedRows((prevSelectedRows) => {
            if (Array.isArray(ids)) {
                const allIdsSelected = ids.every((id) => prevSelectedRows?.includes(id));
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
            selectedRows.length ? deleteMutation(selectedRows) : deleteMutation(singleBlog)
            setBulkDeleteModal(false);
            setSelectedRows([]);
            setSingleBlog([])
        } catch (error) {
            toast.error(`Failed to delete badges: ${error.message}`);
        }
    };
    return (
        <div>
            <div className="flex space-x-4 justify-between mb-4">
                <SearchBar
                    value={params.get("search") || ""}
                    containerClassName="w-[400px]"
                    onChange={(searchString) => handleSearch(searchString)}
                    placeholder="Search Blogs by title."
                />
                {selectedRows.length > 0 && (
                    <Button
                        onClick={() => setBulkDeleteModal(true)}
                        type="button"
                        variant={"default"}
                        className="rounded-none rounded-md"
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
    )
}