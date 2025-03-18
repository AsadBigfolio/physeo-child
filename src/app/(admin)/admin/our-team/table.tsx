"use client";

import ResourceList from "@/components/UI/ResourceList";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Badge from "@/components/UI/Badge";
import { trpc } from "@/utils/trpcClient";
import Spinner from "@/components/UI/Spinner";

export default function Table({ data, totalPages, currentPage, totalRows }) {
  const [storyList, setStoryList] = useState([]);
  const [storyBeingDeleted, setStoryBeingDeleted] = useState("");
  const router = useRouter();
  const { mutate: deleteStory, isPending: deletePending } =
    trpc.story.delete.useMutation();

  const deleteRecord = (item: any) => {
    setStoryBeingDeleted(item);
    deleteStory(
      { id: item },
      {
        onSuccess: () => {
          setStoryList((prevStoryList) =>
            prevStoryList.filter((story: any) => story._id !== item)
          );
          setStoryBeingDeleted("");
        },

        onError: () => {
          setStoryBeingDeleted("");
        },
      }
    );
  };
  useEffect(() => {
    setStoryList(data)
  }, [data])
  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      width: "100px",
      cell: ({ row }) => (
        <div>
          <img
            src={row.original?.image?.src || "/DummyProfilePic.webp"}
            className="rounded-md h-12 w-12 object-cover"
            alt="Story Image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://physeo-prod.s3.amazonaws.com/1682453303744-broken%20link.png";
            }}
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "role",
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
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="Edit"
            onClick={() => router.push(`/admin/our-team/${row.original?._id}`)}
          >
            <MdEdit />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200 text-red-500"
            title="Delete"
            onClick={() => deleteRecord(row.original._id)}
          >
            {storyBeingDeleted === row.original._id ? (
              <Spinner color="purple" />
            ) : (
              <FaRegTrashAlt />
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ResourceList
        columns={columns}
        data={storyList ?? []}
        totalPages={totalPages}
        currentPage={currentPage}
        totalRows={totalRows}
      />
    </div>
  );
}
