"use client"

import ResourceList from '@/components/UI/ResourceList'
import React from 'react'
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/InputFields/SearchBar';
import useQueryParams from '@/hooks/useQueryParams';
import { InfluencerModal } from '@/components/InfluencerModal';

export default function Table({ data, totalPages, currentPage, totalRows }) {
    const params = useQueryParams();
    const router = useRouter();
    const columns = [
        {
            header: "User Name",
            accessorKey: "userName",
            cell: ({ row }) => <span>{row.original.userName}</span>,
        },
        {
            header: "User Email",
            accessorKey: "email",
            cell: ({ row }) => <span>{row.original.email}</span>,
        },
        {
            header: "Total Referrals",
            accessorKey: "referrals",
            cell: ({ row }) => <span>{row.original.totalReferrals}</span>,
        },
        {
            header: "Total Commission",
            accessorKey: "referrals",
            cell: ({ row }) => (
                <span>
                    {row.original.totalCommission}
                </span>
            ),
        },
        {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <InfluencerModal
                        updateContent={() => router.refresh()}
                        referrals={row.original.referrals}
                        modalHeading="Referral Details"
                        buttonText="View Details"
                    />
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
    return (
        <div>
            <div className="flex space-x-4 justify-between mb-4">
                <SearchBar
                    value={params.get("search") || ""}
                    containerClassName="w-[400px]"
                    onChange={(searchString) => handleSearch(searchString)}
                    placeholder="Search Discount codes by title."
                />
            </div>
            <ResourceList
                columns={columns}
                data={data ?? []}
                totalPages={totalPages}
                currentPage={currentPage}
                totalRows={totalRows}
            />
        </div>
    )
}