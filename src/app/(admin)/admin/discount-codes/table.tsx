"use client"

import ResourceList from '@/components/UI/ResourceList'
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from "react-icons/fa";
import { GrCheckboxSelected } from "react-icons/gr";
import { useRouter } from 'next/navigation';
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
    const [discountCodes, setDiscountCode] = useState([] as any);
    const [index, setIndex] = useState(-1);
    const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
    const { mutate: deleteMutation, isPending: deleteLoading } =
        trpc.discountCode.delete.useMutation({
            onSuccess: (data) => {
                toast.success(data?.message);
                router.refresh();
            }
        });
    const { mutate: selectDiscountCode, isPending: discountSelectionLoading } = trpc.discountCode.selectDiscountCode.useMutation({
        onSuccess: (data) => {
            toast.success(data?.message);
            router.refresh();
        }
    });
    const columns = [
        {
            header: "Percentage",
            accessorKey: "percentage",
            cell: ({ row }) => <span>{row.original.percentage}%</span>,
        },
        {
            header: "Discount Code",
            accessorKey: "discountCode",
            cell: ({ row }) => <span>{row.original.discountCode}</span>,
        },
        {
            header: "Selection Status",
            accessorKey: "selected",
            cell: ({ row }) => (
                <span>
                    {row.original.selected ? (
                        <p className="font-bold text-green-700 flex gap-2 items-center">
                            <GrCheckboxSelected /> Selected Discount
                        </p>
                    ) : (
                        <Button
                            onClick={() => {
                                setIndex(row.original._id)
                                selectDiscountCode({ id: row.original._id })
                            }}
                            loading={index === row.original._id && discountSelectionLoading}
                        >
                            Select
                        </Button>
                    )}
                </span>
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
                        href={`/admin/discount-codes/${row.original._id}`}
                    >
                        <MdEdit />
                    </Link>
                    <button
                        className="p-2 rounded-full hover:bg-gray-200 text-red-500"
                        title="Delete"
                        onClick={() => {
                            setBulkDeleteModal(true)
                            setDiscountCode([row.original._id])
                        }}
                    >
                        <FaRegTrashAlt />
                    </button>
                </div >
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
            selectedRows.length ? deleteMutation(selectedRows) : deleteMutation(discountCodes)
            setBulkDeleteModal(false);
            setSelectedRows([]);
            setDiscountCode([])
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
                    placeholder="Search Discount codes by title."
                />
                {selectedRows.length > 0 && (
                    <Button
                        onClick={() => setBulkDeleteModal(true)}
                        type="button"
                        variant={"default"}
                        className=" rounded-md"
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