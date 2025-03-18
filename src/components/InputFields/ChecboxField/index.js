"use client";

import { useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";
import "./checkbox.css";

const CheckboxInput = ({ label, labelStyles, value, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked)
  };
  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <label className={`custom-checkbox ${checked && "checked"} h-[24px]`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="hidden-checkbox"
        name="user-consent"
      />
      <span className="checkbox-box">
        {checked && (
          <span className="checkmark">
            <IoIosCheckmark size={24} />
          </span>
        )}
      </span>
      <p className={`ml-[11px] text-para-base font-poppins ${labelStyles}`}>{label}</p>
    </label>
  );
};

export default CheckboxInput;
