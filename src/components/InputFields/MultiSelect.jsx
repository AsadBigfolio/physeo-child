import React, { useEffect, useState, useRef } from 'react';
import { FaCheck } from "react-icons/fa6";

export const MultiSelect = ({
    options,
    name,
    label,
    isRequired = false,
    labelClasses = '',
    onChange,
    defaultValue = [],
    placeholder,
}) => {
    const [selectedOptions, setSelectedOptions] = useState(defaultValue ?? []);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const handleOptionClick = (option) => {
        if (option.disabled) return;

        const alreadySelected = selectedOptions.some(
            (selected) => selected.value === option.value
        );

        if (alreadySelected) {
            setSelectedOptions(
                selectedOptions.filter((selected) => selected.value !== option.value)
            );
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
    };

    useEffect(() => {
        onChange && onChange(selectedOptions);
    }, [selectedOptions]);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full mb-6" ref={dropdownRef}>
            <label
                htmlFor={name}
                className={`${labelClasses} text-[14px] xl:text-para-base font-poppins mb-2 xl:mb-[13px]`}
            >
                {label}
                <span className="text-red-500">{isRequired && "*"}</span>
            </label>
            <div
                className="py-[12px] px-[16px] bg-transparent border-[1px] mt-3 border-[#0000001A] rounded-full w-full flex items-center justify-between cursor-pointer"
                onClick={toggleDropdown}
            >
                <div className="flex flex-wrap gap-2">
                    {selectedOptions.length > 0 ? (
                        options.map((option) =>
                            selectedOptions.some(
                                (selected) => selected.value === option.value
                            ) && (
                                <div
                                    key={option.value}
                                    className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm"
                                >
                                    {option.label}
                                </div>
                            )
                        )
                    ) : (
                        <span className="text-gray-400">{placeholder ?? 'Select options'}</span>
                    )}
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-mainText"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {dropdownOpen && (
                <div className="absolute mt-2 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="w-full p-2 border-b focus:outline-none"
                    />
                    {filteredOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`p-2 cursor-pointer flex gap-1 items-center 
                                ${option.disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'hover:bg-purple-100'} 
                                ${selectedOptions.some((selected) => selected.value === option.value)
                                    ? 'bg-purple-200 text-purple-800'
                                    : ''
                                }`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {!option.disabled && selectedOptions.some(
                                (selected) => selected.value === option.value
                            ) && <FaCheck className="text-purple-800" />}
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
