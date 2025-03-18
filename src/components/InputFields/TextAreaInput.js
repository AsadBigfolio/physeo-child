const TextAreaInput = ({
  placeholder,
  label,
  name,
  inputClasses,
  labelClasses,
  isRequired,
  error,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col mb-6 relative">
      <label
        htmlFor={name}
        className={`${labelClasses} text-[14px] xl:text-para-base font-poppins  mb-2 xl:mb-[13px]`}
      >
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        name={name}
        placeholder={placeholder}
        className={`${inputClasses} rounded-3xl text-mainText text-para-base py-[13px] px-[24px] bg-transparent border-[1px] border-[#0000001A] outline-none resize-none`}
        rows="3"
      />
      {error && <p className="text-[12px] text-red-500 mt-1 ml-3">{error}</p>}
    </div>
  );
};

export default TextAreaInput;
