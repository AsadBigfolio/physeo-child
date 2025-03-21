"use client";

import { useEffect, useState } from "react";
import Thumbnail from "../UI/Thumbnail";
import ResourceList from "../UI/ResourceList";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { trpc } from "@/utils/trpcClient";
import Link from "next/link";
import Modal from "../UI/Modal";
import { toast } from "sonner";
import Button from "../UI/Button";
import SearchBar from "../InputFields/SearchBar";
import useQueryParams from "@/hooks/useQueryParams";
import Badge from "../UI/Badge";

const CourseTable = ({ courseData }) => {
  const [courseList, setCourseList] = useState([]);
  const [deleteCourse, setDeleteCourse] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  useEffect(() => {
    setCourseList(courseData?.courses ?? [])
  }, [courseData])
  const params = useQueryParams();

  const { mutate: deleteCourseMutation, isPending: deleteLoading } =
    trpc.course.delete.useMutation();

  const handleSelection = (ids) => {
    setSelectedRows((prevSelectedRows) => {
      if (Array.isArray(ids)) {
        const allIdsSelected = ids.every((id) => prevSelectedRows.includes(id));
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

  const handleDelete = () => {
    deleteCourseMutation(deleteCourse, {
      onSuccess: () => {
        setCourseList((prevCourseList) =>
          prevCourseList.filter((course) => course._id !== deleteCourse)
        );
        toast.success("Course deleted successfully!");
        setDeleteCourse("");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Oops Something went wrong!");
        setDeleteCourse("");
      },
    });
  };

  const handleBulkDelete = () => {
    selectedRows.forEach((id) => {
      deleteCourseMutation(id, {
        onError: (err) => {
          toast.error("Oops Something went wrong!");
        },
      });
    });
    setCourseList((prevCourseList) =>
      prevCourseList.filter((course) => !selectedRows.includes(course._id))
    );
    setSelectedRows([]);
    setBulkDeleteModal(false);
    toast.success("Courses deleted successfully!");
  };

  const handleSearch = (searchString) => {
    if (searchString) {
      params.set("search", searchString);
    } else {
      params.delete("search");
    }
    params.update();
  };

  const handleBulkClearance = () => {
    setBulkDeleteModal(false);
    setSelectedRows([]);
  };

  return (
    <>
      <div className="flex space-x-4 justify-between mb-4">
        <SearchBar
          value={params.get("search") || ""}
          containerClassName="w-[400px]"
          onChange={(searchString) => handleSearch(searchString)}
          placeholder="Search Courses by title or description."
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
        totalPages={courseData?.totalPages || 1}
        columns={[
          {
            header: "",
            accessorKey: "image",
            width: "100px",
            cell: ({ row }) => (
              <Thumbnail
                src={row.original.image?.src || "/Course.png"}
                alt="course"
                className=""
              />
            ),
          },
          {
            header: "Title",
            accessorKey: "title",
          },
          {
            header: "Course",
            accessorKey: "category",
            cell: ({ row }) => (
              <p>{row.original.category.title}</p>
            )
          },
          {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => (
              <Badge
                tone={
                  row.original.status === "published" ? "success" : "warning"
                }
              >
                {row.original.status}
              </Badge>
            ),
          },
          {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => (
              <div className="flex space-x-2">
                <Link
                  href={`/admin/modules/${row.original._id}`}
                  className="p-2 rounded-full "
                  title="Edit"
                >
                  <MdEdit />
                </Link>
                <button
                  className="p-2 rounded-full  text-red-500"
                  title="Delete"
                  onClick={() => setDeleteCourse(row.original._id)}
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ),
          },
        ]}
        data={courseList || []}
        totalRows={courseData?.totalCourses}
      />
      <Modal
        title="Are you sure you want to delete?"
        subtitle=""
        onClose={() => setDeleteCourse("")}
        open={deleteCourse}
        actions={[
          {
            content: "No",
            variant: "outline",
            onAction: () => setDeleteCourse(""),
          },
          {
            content: "Yes",
            variant: "",
            onAction: handleDelete,
            loading: deleteLoading,
          },
        ]}
      />
      <Modal
        title="Are you sure you want to bulk delete?"
        subtitle=""
        onClose={() => setBulkDeleteModal(false)}
        open={bulkDeleteModal}
        actions={[
          {
            content: "No",
            onAction: handleBulkClearance,
          },
          {
            content: "Yes",
            variant: "destructive",
            onAction: handleBulkDelete,
            loading: deleteLoading,
          },
        ]}
      />
    </>
  );
};

export default CourseTable;
