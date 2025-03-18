"use client";

import { useEffect, useState } from "react";
import Thumbnail from "../UI/Thumbnail";
import ResourceList from "../UI/ResourceList";
import { trpc } from "@/utils/trpcClient";
import Modal from "../UI/Modal";
import { toast } from "sonner";
import Button from "../UI/Button";
import SearchBar from "../InputFields/SearchBar";
import useQueryParams from "@/hooks/useQueryParams";
import Editor from '../Editor';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const NewsLetterTable = ({ studentsData, newsLetterUsers }) => {
    const router = useRouter();
    const [studentList, setStudentList] = useState([...studentsData.users, ...newsLetterUsers]);
    const [message, setMessage] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [showEditorModal, setEdittorModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [userId, setUserId] = useState('');
    useEffect(() => {
        setStudentList([...studentsData.users, ...newsLetterUsers]);
    }, [studentsData]);
    const params = useQueryParams();
    const { mutate: sendNewsLetter, isPending: isSending } =
        trpc.newsLetter.sendNewsletter.useMutation(
            {
                onSuccess: () => {
                    setSelectedRows([]);
                    setEdittorModal(false);
                    toast.success("News Letters send successfully!");
                }
            }
        );
    const { mutate: deleteUser, isPending: deleteLoading } =
        trpc.user.deleteStudent.useMutation(
            {
                onSuccess: () => {
                    setSelectedRows([]);
                    setDeleteModal(false);
                    setUserId('')
                    toast.success("User deleted successfully!");
                    router.refresh()
                }
            }
        );

    const handleSelection = (ids) => {
        setSelectedRows((prevSelectedRows) => {
            if (Array.isArray(ids)) {
                const allIdsSelected = ids.every((id) =>
                    prevSelectedRows.some((row) => row._id === id)
                );
                if (allIdsSelected) {
                    return prevSelectedRows.filter((row) => !ids.includes(row._id));
                } else {
                    const newSelected = studentList.filter((user) =>
                        ids.includes(user._id)
                    );
                    return [...new Set([...prevSelectedRows, ...newSelected])];
                }
            } else {
                const isSelected = prevSelectedRows.some((row) => row._id === ids);
                if (isSelected) {
                    return prevSelectedRows.filter((row) => row._id !== ids);
                } else {
                    const user = studentList.find((user) => user._id === ids);
                    return [...prevSelectedRows, user];
                }
            }
        });
    };

    const handleMessageSend = () => {
        if (!message.length) {
            return
        }
        const emails = selectedRows.map((item) => item.email)
        sendNewsLetter({
            emails,
            message
        })
    };

    const handleSearch = (searchString) => {
        if (searchString) {
            params.set("search", searchString);
        } else if (
            searchString == "" ||
            searchString == null ||
            searchString == undefined
        ) {
            params.delete("search");
        }
        params.update();
    };

    const handleBulkClearance = () => {
        setEdittorModal(false);
        setSelectedRows([]);
    };

    const handleDeleteUser = () => {
        if (!userId) {
            return
        }
        deleteUser({ _id: userId })

    }
    console.log({ selectedRows })
    return (
        <>
            <div className="flex space-x-4 justify-between items-end mb-4">
                <SearchBar
                    onChange={(searchString) => handleSearch(searchString)}
                    containerClassName="w-[400px]"
                    placeholder="Search"
                    value={params.get("search")}
                />
                {selectedRows.length > 0 && (
                    <Button
                        onClick={() => setEdittorModal(true)}
                        type="button"
                        variant={"default"}
                        className="rounded-md"
                    >
                        Send
                    </Button>
                )}
            </div>
            <ResourceList
                selection={{
                    enabled: true,
                    keyAccessor: "_id",
                    selected: selectedRows.map((item) => item?._id),
                    onAllRowSelect: (ids) => handleSelection(ids),
                    onRowSelect: (id) => handleSelection(id),
                }}
                totalPages={studentsData?.totalPages || 1}
                totalRows={studentsData?.totalUsers}
                columns={[
                    {
                        header: "",
                        accessorKey: "image",
                        width: "100px",
                        cell: ({ row }) => (
                            <Thumbnail
                                src={row.original.image || "/DummyProfilePic.jpg"}
                                alt="student"
                                className=""
                            />
                        ),
                    },
                    {
                        header: "Name",
                        accessorKey: "firstName",
                        cell: ({ row }) => (
                            <p>{`${row?.original?.firstName ?? ''} ${row.original.lastName ?? '-'}`}</p>
                        ),
                    },
                    {
                        header: "User Name",
                        accessorKey: "userName",
                    },
                    {
                        header: "Email",
                        accessorKey: "email",
                    },
                    {
                        header: "Phone",
                        accessorKey: "phoneNumber",
                    },
                    {
                        header: "Plan",
                        accessorKey: "subscribedPlans",
                        cell: ({ row }) => {
                            const item = row.original?.subscribedPlans
                            return item && <p key={item}>{`${item[0]?.plan?.title ?? "👨🏻‍💼 FREE PLAN"}`}</p>
                        }
                    },
                ]}
                data={studentList || []}
            />
            <Modal
                title="Are you sure you want to send?"
                subtitle=""
                onClose={() => setEdittorModal(false)}
                open={showEditorModal}
                actions={[
                    {
                        content: "Cancel",
                        variant: "outline",
                        onAction: handleBulkClearance,
                    },
                    {
                        content: "Send",
                        variant: "",
                        onAction: handleMessageSend,
                        loading: isSending,
                    },
                ]}
            >
                <Editor
                    label="Enter Newsletters"
                    name="description"
                    value={message}
                    error={!message.length ? 'Message required!' : ''}
                    onEditorChange={(e) => setMessage(e)}
                />
            </Modal>
            <Modal
                title="Are you sure you want to delete?"
                subtitle=""
                onClose={() => setDeleteModal(false)}
                open={showDeleteModal || deleteLoading}
                actions={[
                    {
                        content: "No",
                        onAction: () => setDeleteModal(false),
                        loading: false,
                        variant: "outline",
                    },
                    {
                        content: "Yes",
                        onAction: handleDeleteUser,
                        loading: deleteLoading,
                    },
                ]}
            />

        </>
    );
};

export default NewsLetterTable;
