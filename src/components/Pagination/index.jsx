"use client";

import useQueryParams from "@/hooks/useQueryParams";

const Pagination = ({ currentPage, totalPages }) => {
  const params = useQueryParams();

  const onPageChange = (pageNumber) => {
    if (pageNumber) {
      params.set("page", pageNumber);
    }
    params.update();
  };

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap space-y-3 items-center justify-center space-x-2 mt-8">
      <button
        className={`py-2 mt-3 px-4 border rounded-full text-purple-700 border-purple-700 hover:bg-purple-100 ${
          currentPage == 1 ? "cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(Number(currentPage) - 1)}
        disabled={currentPage == 1}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`py-2 px-4 flex items-center border rounded-full ${
            number == currentPage
              ? "bg-purple-700 text-white"
              : "text-purple-700 bg-[#A197EC80] hover:bg-purple-100"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={`py-2 px-4 border rounded-full text-purple-700 border-purple-700 hover:bg-purple-100 ${
          currentPage == totalPages ? "cursor-not-allowed" : ""
        }`}
        onClick={() => onPageChange(Number(currentPage) + 1)}
        disabled={currentPage == totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
