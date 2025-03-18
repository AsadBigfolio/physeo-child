import { Skeleton as SkeletonComp } from "@/components/UI/Skeleton";

function Row({ columns, rowPadding }) {
  return (
    <>
      <div className="flex gap-5 pt-[10px] px-5">
        {Array.from({ length: columns }).map((each, i) => (
          <SkeletonComp
            style={{
              padding: rowPadding,
            }}
            className="h-[30px] w-full "
            key={i}
          />
        ))}
      </div>
      <hr />
    </>
  );
}

export default function Skeleton({
  rows = 10,
  columns = 7,
  rowPadding = 10,
  title = true,
}) {
  return (
    <>
      <div className="flex items-center space-x-6 pt-[5px] ">
        <div className="space-y-2 w-[100%]">
          <div className="flex flex-col gap-2">
            {title && <SkeletonComp className="h-[20px] w-[10%]" />}
            <SkeletonComp className="h-10 bg-primary-light" />
          </div>
          <div className="bg-white h-[100%] flex flex-col gap-[10px] w-[100%]">
            {Array.from({ length: rows }).map((each, i) => (
              <Row rowPadding={rowPadding} columns={columns} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
