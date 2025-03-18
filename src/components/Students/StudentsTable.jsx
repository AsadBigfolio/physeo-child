"use client";

import { useContext, useEffect, useState } from "react";
import Thumbnail from "../UI/Thumbnail";
import ResourceList from "../UI/ResourceList";
import { trpc } from "@/utils/trpcClient";
import Modal from "../UI/Modal";
import { toast } from "sonner";
import Button from "../UI/Button";
import SearchBar from "../InputFields/SearchBar";
import useQueryParams from "@/hooks/useQueryParams";
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import UserContext from '@/context/user';

const StudentsTable = ({ studentsData }) => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [studentList, setStudentList] = useState(studentsData.users);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    setStudentList(studentsData.users);
  }, [studentsData]);
  const params = useQueryParams();
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
          const newSelected = studentsData.users.filter((user) =>
            ids.includes(user._id)
          );
          return [...new Set([...prevSelectedRows, ...newSelected])];
        }
      } else {
        const isSelected = prevSelectedRows.some((row) => row._id === ids);
        if (isSelected) {
          return prevSelectedRows.filter((row) => row._id !== ids);
        } else {
          const user = studentsData.users.find((user) => user._id === ids);
          return [...prevSelectedRows, user];
        }
      }
    });
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
    setSelectedRows([]);
  };

  const handleDeleteUser = () => {
    if (!userId && !selectedRows?.length) {
      return
    }
    if (userId === user?._id) {
      setDeleteModal(false)
      setUserId('')
      toast.error("You cannot delete your own account.");
      return
    }
    if (userId) {
      deleteUser({ _id: userId })
    }

  }

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
            onClick={() => setDeleteModal(true)}
            type="button"
            variant={"default"}
            className="rounded-md"
          >
            Bulk Delete
          </Button>
        )}
      </div>
      <ResourceList
        selection={{
          enabled: true,
          keyAccessor: "_id",
          selected: selectedRows.map((item) => item._id),
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
              <p>{`${row.original.firstName} ${row.original.lastName}`}</p>
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
              return <p key={item}>{`${item[0]?.plan?.title ?? "👨🏻‍💼 FREE PLAN"}`}</p>
            }
          },
          {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => (
              <div className="flex space-x-2">
                <Link
                  className="p-2 rounded-full hover:bg-gray-200"
                  title="Edit"
                  href={`students/${row.original._id}`}
                >
                  <MdEdit />
                </Link>
                <button
                  className="p-2 rounded-full hover:bg-gray-200 text-red-500"
                  title="Delete"
                  onClick={() => {
                    setDeleteModal(true);
                    setUserId(row.original._id)
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ),
          },
        ]}
        data={studentList || []}
      />
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

export default StudentsTable;
