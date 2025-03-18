"use client";

import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Modal from "@/components/UI/Modal";
import { IoAdd } from "react-icons/io5";
import { AiOutlineFilePdf, AiOutlinePlayCircle } from "react-icons/ai";
import FileManagement from "@/components/FileManagment";

const MediaInput = ({
  type,
  placeholder,
  label,
  name,
  inputClasses,
  labelClasses,
  isRequired,
  error,
  defaultMedia = [],
  disabled,
  Icon,
  onChange,
  multiple,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (!defaultMedia.length) return;
    setSelectedFiles(defaultMedia);
  }, [defaultMedia]);

  const onSelect = (value) => {
    setSelectedFiles((prev) => {
      const updatedFiles = [...prev, value];
      onChange(updatedFiles);
      return updatedFiles;
    });
    setOpen(false);
  };

  const iconClickHandler = (value) => {
    if (value === "open") {
      setOpen(true);
      return;
    }
    if (value === "close") {
      setSelectedFiles([]);
      onChange([]);
    }
  };

  const renderIcon = (file) => {
    if (file?.fileType?.includes("video")) {
      return (
        <div className="w-[96px] flex justify-center h-[96px] items-center bg-blue-50">
          <AiOutlinePlayCircle className="text-8xl text-blue-400" />
        </div>
      );
    }
    if (file?.fileType?.includes("pdf")) {
      return (
        <div className="w-[96px] flex justify-center h-[96px] items-center bg-red-50">
          <AiOutlineFilePdf className="text-8xl text-red-700" />
        </div>
      );
    }

    return (
      <div className="text-center rounded-lg overflow-hidden">
        <img
          src={file?.src ?? ''}
          className="w-[96px] h-[96px] object-cover"
          alt="img"
        />
      </div>
    );
  };

  const renderFilePreview = () => {
    if (multiple) {
      return selectedFiles.map((file, index) => (
        <div key={index} className="relative mr-5 border-[1px]">
          {renderIcon(file)}
          <span
            className="absolute top-[-10px] right-2 bg-white rounded-full p-1 shadow-xl cursor-pointer"
            onClick={() => removeFile(index)}
          >
            <IoMdClose />
          </span>
        </div>
      ));
    }

    if (selectedFiles.length) {
      return (
        <div className="relative">
          <div className="mr-5 border-[1px]">
            {renderIcon(selectedFiles[0])}
            <span
              className="absolute top-[-10px] right-2 bg-white rounded-full p-1 shadow-xl cursor-pointer"
              onClick={() => iconClickHandler("close")}
            >
              <IoMdClose />
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="h-[96px] rounded-lg hover:bg-slate-100 cursor-pointer duration-500 transition-all w-[96px] border-[1px] border-[#0000001A] flex items-center justify-center"
          onClick={() => iconClickHandler("open")}
        >
          <IoAdd size={42} />
        </div>
      );
    }
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <>
      <label
        htmlFor={name}
        className={`${labelClasses} text-para-base font-poppins font-semibold mb-[13px]`}
      >
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="rounded-2xl text-mainText text-para-base py-6 px-6 bg-transparent mt-3 border-[1px] border-[#0000001A] flex">
        <input
          type="hidden"
          name={name}
          value={multiple ? JSON.stringify(selectedFiles) : selectedFiles?.id}
        />

        {selectedFiles && renderFilePreview()}
        {!multiple && selectedFiles ? null : (
          <div
            className="h-[96px] rounded-lg hover:bg-slate-100 cursor-pointer duration-500 transition-all w-[96px] border-[1px] border-[#0000001A] flex items-center justify-center"
            onClick={() => iconClickHandler("open")}
          >
            <IoAdd size={42} />
          </div>
        )}

        <Modal
          title="Files"
          subtitle=""
          open={open}
          onClose={() => setOpen(false)}
        >
          <FileManagement onSelect={onSelect} />
        </Modal>
      </div>
      {error && <p className="text-[12px] text-red-500 mt-1 ml-3">{error}</p>}
    </>
  );
};

export default MediaInput;
