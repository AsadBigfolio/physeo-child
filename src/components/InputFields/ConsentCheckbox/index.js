"use client";

import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import "./checkbox.css";
import Link from "next/link";

const ConsentCheckboxInput = ({ onChange, value, error }) => {
  return (
    <div className="mb-[20px] xl:mb-[30px]">
      <label className={`custom-checkbox ${value && "checked"} h-[24px]`}>
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="hidden-checkbox"
          name="user-consent"
        />
        <span className="checkbox-box">
          {value && (
            <span className="checkmark">
              <IoIosCheckmark size={18} />
            </span>
          )}
        </span>
        <p className="ml-[11px] text-[12px] xl:text-para-base font-poppins">
          By Signing Up, I agree to the{" "}
          <Link href={"/terms-of-service"} target='_blank' className="font-bold text-primary">
            Term of Service.
          </Link>
        </p>
      </label>
      {error && (
        <p className="text-[10px] xl:text-[12px] text-red-500 mt-1 ml-3">
          {error}
        </p>
      )}
    </div>
  );
};

export default ConsentCheckboxInput;
