'use client'
import { trpc } from '@/utils/trpcClient';
import Link from 'next/link';
import React, { useEffect } from 'react'
import Skelton from './skelton';
import { GoStar, GoStarFill } from "react-icons/go";
import { PiShareFatLight, PiVideo } from "react-icons/pi";
import { cn } from '@/utils/classNames';
export default function VideoList({ searchTerm }) {
    const { data, error, isLoading, refetch } = trpc.video.getAll.useQuery({ searchQuery: searchTerm }, {
        enabled: false,
    });
    const generateExactTime = (input) => {
        const hour = Math.floor(input / 60);
        const minute = input % 60;

        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    };
    useEffect(() => {
        if (searchTerm) {
            refetch();
        }
    }, [searchTerm, refetch]);
    if (isLoading) {
        return <div className="flex flex-col space-y-4">
            {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index}>
                    <Skelton />
                </div>
            ))}
        </div>
    }
    if (!data?.length && searchTerm) {
        return <p className="text-center">Videos not found.</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;
    }
    return (
        <div className="space-y-1">
            {data?.map((item, index) => (
                <Link href={`/courses/${item?.course?.slug}?video=${item?._id}`}
                    className={cn(
                        "font-poppins flex items-center space-x-4 hover:bg-[#cac5e952] p-2 rounded-lg",
                    )}
                    key={index}
                >
                    <div className="w-32 h-20 flex-shrink-0 flex items-center relative">
                        <img
                            src={item?.thumbnail?.src}
                            alt={item?.title}
                            className="aspect-video object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-[#FFFFFF80] text-black text-xs px-2 py-1 rounded-lg">
                            {generateExactTime(item.duration)}
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center mb-1 2xl:mb-3">
                            <h3 className="text-base 2xl:text-title-lg line-clamp-1">{item?.title}</h3>
                            <div className="flex items-center space-x-3 text-[18px] 2xl:text-[20px]">
                                <span >
                                    {false ? (
                                        <GoStarFill className="text-primary" />
                                    ) : (
                                        <GoStar />
                                    )}
                                </span>
                                <PiShareFatLight />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <PiVideo size={24} />
                            <span> {generateExactTime(item.duration)}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
