"use client";
import React, { useEffect, useState } from "react";

const TagInput = ({
  placeholder,
  label,
  name,
  inputClasses,
  labelClasses,
  isRequired,
  error,
  disabled,
  value,
  onChange,
  isTopic,
  ...props
}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (isTopic) {
        const topicsList = inputValue.split(",")
        const newTags = [...tags, ...topicsList];
        setTags(newTags);
        onChange([...newTags])
        setInputValue("");
        return
      }
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      onChange([...newTags])
      setInputValue("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange([...newTags])
  };
  useEffect(() => {
    value?.length && setTags(value)
  }, [value])
  return (
    <div className="w-full flex flex-col mb-6 relative">
      <label
        htmlFor={name}
        className={`${labelClasses} text-[14px] xl:text-para-base font-poppins  mb-2 xl:mb-[13px]`}
      >
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-primary text-white rounded-full py-1 px-3 mr-2 mb-2 cursor-pointer"
            onClick={() => handleRemoveTag(index)}
          >
            <span>{tag}</span>
            <button
              type="button"
              className="ml-2"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        disabled={disabled}
        {...props}
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        className={`${inputClasses} rounded-full disabled:cursor-not-allowed disabled:bg-[#F2F2F2] disabled:text-mainText text-para-base py-[13px] px-[24px] bg-transparent border-[1px] border-[#0000001A] outline-none`}
      />
      {error && <p className="text-[12px] text-red-500 mt-1 ml-3">{error}</p>}
      <input type="hidden" name={name} value={tags.join(', ')} />
    </div>
  );
};

export default TagInput;