import { cn } from "@/utils/classNames";
// import Select from "@/components/UI/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect } from "react";
import useQueryParams from "@/hooks/useQueryParams";

interface Props {
  data: any[];
  totalRows?: number;
  limit?: number;
  name?: string;
  totalPages?: number;
  limitOptions: number[];
  footerSticky: boolean;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onLimitChange?: (e: any) => void;
  page: number;
  enabled?: boolean;
}

const Pagination: React.FC<Props> = ({
  data,
  totalRows = 1,
  limit = 25,
  name = "Rows",
  totalPages = 1,
  limitOptions,
  footerSticky,
  onPrevPage,
  onNextPage,
  onLimitChange,
  enabled = true,
  page,
}) => {
  
  const params = useQueryParams();
  
  const handleNextPage = useCallback(() => {
    if (page >= totalPages!) return;
    params.set("page", Number(page) + 1);
    params.update();
  }, [page, totalPages]);
  
  const handlePrevPage = useCallback(() => {
    if (Number(page) === 1) return;
    params.set("page", Number(page) - 1);
    params.update();
  }, [page, totalPages]);
  
  const handleLimitChange = useCallback(
    (value: string) => {
      params.set("limit", value);
      params.update();
    },
    [limit]
  );
  
  if (!enabled) return null;
  return (
    <div
      className={cn(
        "w-full h-[40px] px-2 pb-2 bg-white flex justify-between items-center border-b-[#dbdddf] border-b-[1px]",
        {
          "sticky bottom-0": footerSticky,
        }
      )}
    >
      <div>
        <span className="text-[#6C757D] text-para-base font-golos leading-[14.4px]">
          {data?.length || 0} of {totalRows} {name}
        </span>
      </div>
      <div className="flex gap-2 items-center text-[#6C757D] text-para-base">
        {/* <Select
          onChange={onLimitChange || handleLimitChange}
          value={String(limit)}
          className="!text-[red]"
          options={limitOptions?.map((opt) => ({
            label: `${opt} per page`,
            value: String(opt),
          }))}
        /> */}
        <div>
          <div className="flex items-center gap-1">
            Page{" "}
            <span className="border-[#ececec] flex justify-center items-center rounded-[5px] px-2 border-2">
              {page}
            </span>{" "}
            of {totalPages || 1}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onPrevPage || handlePrevPage}>
            <ChevronLeftIcon width={18} />
          </button>
          <button onClick={onNextPage || handleNextPage}>
            <ChevronRightIcon width={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
