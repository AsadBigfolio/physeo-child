import React, { useContext } from 'react';
import ResourceList from '../UI/ResourceList';
import { trpc } from '@/utils/trpcClient';
import UserContext from '@/context/user';
import Spinner from '../UI/Spinner';

export default function ReferralDetail() {
    const user = useContext(UserContext);

    const { data, isLoading } = trpc.referral.getReferralsList.useQuery({
        userId: user?.user?._id
    });

    const columns = [
        {
            header: "Student Email",
            accessorKey: "studentEmail",
            cell: ({ row }) => <span>{row.original.studentEmail}</span>,
        },
        {
            header: "Student Name",
            accessorKey: "studentName",
            cell: ({ row }) => <span>{row.original.studentName}</span>,
        },
        {
            header: "Commission",
            accessorKey: "commission",
            cell: ({ row }) => (
                <span
                    className={row.original.isRefund || row.original.commissionSent ? "line-through text-gray-400" : ""}
                >
                    {row.original.commission}
                </span>
            ),
        },
        {
            header: "Commission Sent",
            accessorKey: "commissionSent",
            cell: ({ row }) => <span>{row.original.commissionSent ? "Yes" : "No"}</span>,
        },
        {
            header: "Plan",
            accessorKey: "plan",
            cell: ({ row }) => <span>{row.original.plan?.planName}</span>,
        },
        {
            header: "Refunded",
            accessorKey: "isRefund",
            cell: ({ row }) => <span>{row.original.isRefund ? "Yes" : "No"}</span>,
        },
    ];

    return (
        <div className="relative min-h-[200px]">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[100px]">
                    <Spinner color='black' />
                </div>
            ) : (
                <ResourceList
                    columns={columns}
                    data={data?.referrals ?? []}
                    totalRows={data?.totalReferrals ?? 0}
                />
            )}
        </div>
    );
}
