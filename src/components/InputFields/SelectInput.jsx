const SelectInput = ({
  label,
  name,
  inputClasses,
  labelClasses,
  isRequired,
  options,
  error,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col mb-6 relative">
      <label
        htmlFor={name}
        className={`${labelClasses} text-[14px] xl:text-para-base font-poppins mb-2 xl:mb-[13px]`}
      >
        {label}
        <span className="text-red-500">{isRequired && "*"}</span>
      </label>
      <div className="relative w-full">
        <select
          {...props}
          name={name}
          className={`${inputClasses} appearance-none rounded-full text-mainText text-para-base py-[13px] px-[24px] border-[1px] outline-none w-full 
            ${props.disabled ? "bg-[#F2F2F2] cursor-not-allowed bg-transparent border-[1px] border-[#0000001A] outline-none" : "bg-transparent border-[#0000001A]"}
          `}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom down arrow */}
        <div className="pointer-events-none absolute top-1/2 right-3 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${props.disabled ? "text-gray-400" : "text-mainText"}`}
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
      </div>
      {error && <p className="text-[12px] text-red-500 mt-1 ml-3">{error}</p>}
    </div>
  );
};

export default SelectInput;
