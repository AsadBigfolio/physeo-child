import { useState } from 'react';
import Modal from '../UI/Modal';
import ResourceList from '../UI/ResourceList';
import Button from '../UI/Button';
import SelectInput from '../InputFields/SelectInput';
import { trpc } from '@/utils/trpcClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const InfluencerModal = ({
    buttonText,
    modalHeading,
    referrals,
    updateContent,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter()
    const { mutate } = trpc.referral.updateReferral.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            router.refresh()
        }
    })
    const updateReferral = (value) => {
        if (value?.mutation?.commissionSent !== undefined) {
            value.mutation.commissionSent = value.mutation.commissionSent === "true";
        }
        if (value?.mutation?.isRefund !== undefined) {
            value.mutation.isRefund = value.mutation.isRefund === "true";
        }
        console.log(value)
        mutate(value)
    }
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
                    style={
                        row.original.isRefund || row.original.commissionSent
                            ? { textDecoration: "line-through" }
                            : {}
                    }
                >
                    {row.original.commission}
                </span>
            ),
        },
        {
            header: "Refunded",
            accessorKey: "isRefund",
            cell: ({ row }) => (
                <>
                    {!row.original.commissionSent && <SelectInput
                        defaultValue={row.original.isRefund}
                        style={{ width: 120, padding: 8 }}
                        onChange={async (e) => {
                            updateReferral({ _id: row.original._id, mutation: { isRefund: (e.target.value) } });
                            updateContent();
                        }}
                        options={[
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                        ]}
                    />}
                </>
            ),
        },
        {
            header: "Commission Sent",
            accessorKey: "commissionSent",
            cell: ({ row }) => (
                <div className='relative'>
                    {!row.original.isRefund && <SelectInput
                        defaultValue={row.original.commissionSent}
                        style={{ width: 120, padding: 8 }}
                        onChange={async (e) => {
                            updateReferral({ _id: row.original._id, mutation: { commissionSent: e.target.value } });
                            updateContent();
                        }}
                        options={[
                            { value: "true", label: "Yes" },
                            { value: "false", label: "No" },
                        ]}
                    />}
                </div>
            ),
        },
        {
            header: "Plan",
            accessorKey: "plan",
            cell: ({ row }) => (
                <>
                    <span>{row.original.plan.planName}</span>
                </>
            ),
        },
        {
            header: "Due Date",
            accessorKey: "createdAt",
            cell: ({ row }) => {
                const dueDate = new Date(new Date(row.original.createdAt).setDate(new Date(row.original.createdAt).getDate() + 30));
                return (
                    <span
                        style={
                            row.original.isRefund || row.original.comissionSent
                                ? { textDecoration: "line-through" }
                                : {}
                        }
                    >
                        {dueDate.toLocaleDateString()}
                    </span>
                );
            },
        },
    ];


    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
                {buttonText}
            </Button>
            <Modal
                title={modalHeading}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="overflow-x-hidden !max-w-[1000px]"
            >
                <ResourceList
                    columns={columns}
                    data={referrals}
                />
            </Modal>
        </>
    );
};