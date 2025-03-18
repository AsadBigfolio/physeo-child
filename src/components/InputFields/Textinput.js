"use client";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const TextInput = ({
  type,
  placeholder,
  label,
  name,
  inputClasses,
  labelClasses,
  isRequired,
  error,
  defaultValue,
  disabled,
  value,
  Icon,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const renderInputType = () => {
    if (type === "password" && isPasswordVisible) {
      return "text";
    }
    return type;
  };

  return (
    <div className="w-full flex flex-col mb-4 xl:mb-6 relative">
      <label
        htmlFor={name}
        className={`${labelClasses} text-[14px] xl:text-para-base font-poppins  mb-2 xl:mb-[13px]`}
      >
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        disabled={disabled}
        {...props}
        type={renderInputType()}
        name={name}
        placeholder={placeholder}
        className={`${inputClasses} rounded-full disabled:cursor-not-allowed disabled:bg-[#F2F2F2] disabled: text-mainText text-[12px] md:text-[16px] xl:text-para-base py-[10px] xl:py-[13px] px-[16px] xl:px-[24px] bg-transparent border-[1px] border-[#0000001A] outline-none`}
        defaultValue={defaultValue}
        value={value}
      />
      {Icon && (
        <div className="absolute right-4 top-12 cursor-pointer">{Icon}</div>
      )}
      {type === "password" && (
        <div
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[40px] xl:top-[52px] cursor-pointer"
        >
          {isPasswordVisible ? (
            <FaRegEyeSlash size={14} color="#202020" />
          ) : (
            <FaRegEye size={14} color="#202020" />
          )}
        </div>
      )}
      {error && (
        <p className="text-[10px] xl:text-[12px] text-red-500 mt-1 ml-3">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
