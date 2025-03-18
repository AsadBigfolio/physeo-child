"use client"
import { useState, useEffect } from "react";
import {
  AiOutlineInbox,
  AiOutlineSearch,
  AiOutlineFilePdf,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { toast } from "sonner";
import Button from "../UI/Button";
import { cn } from "@/utils/classNames";
import { trpc } from "@/utils/trpcClient";
import useFileManagement from "@/hooks/useFileManagement";
import Spinner from "../UI/Spinner";
import { GoMail } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";

const FilePreview = ({ item, onSelect, fetchFiles }) => {
  const { mutateAsync: deleteFile, isPending: deletePending } = trpc.file.delete.useMutation();
  
  const renderIcon = () => {
    if (item.type?.includes("video")) {
      return (
        <div className="w-full flex justify-center h-32 items-center bg-blue-50">
          <AiOutlinePlayCircle className="text-8xl text-blue-400" />
        </div>
      );
    }
    if (item.type?.includes("pdf")) {
      return (
        <div className="w-full flex justify-center h-32 items-center bg-red-50">
          <AiOutlineFilePdf className="text-8xl text-red-700" />
        </div>
      );
    }
    return (
      <div className="text-center">
        <img src={item.src} className="w-full object-cover rounded-[10px] rounded-b-none mb-[6px] h-[338px] " alt="img" />
      </div>
    );
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (deletePending) return;
    await deleteFile({ id: item._id });
    fetchFiles();
  };

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer p-4"
      onClick={() => onSelect && onSelect(item)}
    >
      {renderIcon()}
      <div className="flex justify-between w-full items-center">
        <p className="text-xs break-all mt-2">{item.name}</p>
        <div className="pt-3 text-base text-red-500" onClick={handleDelete}>
          {deletePending ? <Spinner color="purple" /> : <RiDeleteBin6Line />}
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ onChange, placeholder = "" }) => {
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typing) {
      const timeout = setTimeout(() => {
        onChange(search);
        setTyping(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setTyping(true);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        className="border p-2 rounded-md w-full"
        placeholder={placeholder}
        type="search"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

const FileManagement = ({ onSelect }) => {
  const [dragging, setDragging] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setLimit] = useState(12);
  const [search, setSearch] = useState("");
  const [fileList, setFileList] = useState([]);

  const { data, error, isLoading, refetch } = trpc.file.list.useQuery({
    page,
    pageSize,
    search,
  });

  const files = data?.files || [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    if (files.length) {
      if (search) {
        setFileList([...files]);
      } else {
        setFileList((prevFiles) => [...prevFiles, ...files]);
      }
    }
  }, [files]);

  const {
    handleUpload,
    loading,
    success: uploadSuccess,
    error: uploadError,
  } = useFileManagement(files);

  useEffect(() => {
    if (uploadSuccess) {
      toast.success("Upload success");
      refetch();
    }
    if (uploadError) {
      toast.error("Upload failed");
    }
  }, [uploadSuccess, uploadError, loading]);

  return (
    <div className={`relative p-4 ${loading ? "opacity-50" : ""}`}>
      <div className="py-4">
        <div htmlFor="file-upload">
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragging(false);
            }}
            className={cn(
              "border-dashed border-[1px] border-[#646464] rounded-md p-4 grid place-items-center",
              {
                "border-[#646464]": !dragging,
                "border-[#3182ce] bg-gray-100": dragging,
              }
            )}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleUpload(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="text-center py-2">
              <div className="flex justify-center">
                <AiOutlineInbox className="text-4xl text-gray-500" />
              </div>
              <p className="px-2 mb-0 text-xs">Drag file(s)/video(s) to upload</p>
            </div>
            <Button
              as="label"
              variant="outline"
              size="sm"
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              Choose Files
            </Button>
          </div>
          <input
            type="file"
            className="hidden"
            id="file-upload"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
          />
        </div>
      </div>
      <div className="py-4">
        <SearchBar placeholder="Search image title/type" onChange={setSearch} />
        <div className="w-full py-6 space-y-2">
          {false ? (
            <div className="flex w-full justify-center items-center">
              <Spinner color="purple" />
            </div>
          ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${onSelect ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}  gap-4`}>
                {!!fileList.length &&
                  fileList.map((item) => (
                    <FilePreview
                      key={item._id}
                      item={item}
                      onSelect={onSelect}
                      fetchFiles={refetch}
                    />
                ))}
            </div>
          )}
        </div>
        {!fileList.length && (
                <p className="w-full text-center text-gray-500">
                  No files found.
                </p>
              )}
        {fileList.length && <div className="text-center">
            <Button
              className="w-full"
            loading={isLoading}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              Load More
            </Button>
        </div>}
      </div>
    </div>
  );
};

export default FileManagement;
