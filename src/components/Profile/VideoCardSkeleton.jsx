import { cn } from '@/utils/classNames';

const VideoCardSkeleton = () => {
  return (
    <div className={cn('cursor-pointer rounded-[8px] !w-[910px] p-4 overflow-hidden flex flex-col bg-white')}>
      <div className="relative h-[550px] rounded-[8px] overflow-hidden bg-gray-200 pulse" />
      <div className="py-[16px] mb-[6px]">
        <div className="h-[24px] w-[60%] bg-gray-200 mb-[4px] pulse" />
        <div className="h-[18px] w-[80%] bg-gray-200 pulse" />
      </div>
    </div>
  );
};

export default VideoCardSkeleton;
