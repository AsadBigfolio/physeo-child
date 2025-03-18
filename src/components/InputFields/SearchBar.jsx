import { cn } from "@/utils/classNames";
import { useState, useEffect } from "react";

const SearchBar = ({
  onChange,
  placeholder = "",
  containerClassName = '',
  value = "",
  inputClassName = '',
}) => {
  const [search, setSearch] = useState(value);
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
    <div className={cn("flex items-center space-x-2", containerClassName)}>
      <input
        className={cn(
          "border p-2 rounded-md w-full outline-none",
          inputClassName
        )}
        placeholder={placeholder}
        type="search"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
