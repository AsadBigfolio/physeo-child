'use client'
import { trpc } from '@/utils/trpcClient';
import Link from 'next/link';
import React, { useEffect } from 'react'
import Skelton from '../VideoList/skelton';
import { cn } from '@/utils/classNames';

export default function BlogList({ searchTerm }) {
    const dummyImageUrl = 'https://via.placeholder.com/180x100'
    const { data, error, isLoading, refetch } = trpc.blog.getAllBlogs.useQuery({ search: searchTerm }, {
        enabled: false,
    });

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
        </div>;
    }
    if (!data?.length && searchTerm) {
        return <p className="text-center">Blogs not found.</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;
    }
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    return (
        <div className="space-y-1">
            {data?.map((item) => (
                <Link href={`/blog/${item?.slug}`}
                    className={cn(
                        "font-poppins flex items-center space-x-4 hover:bg-[#cac5e952] p-2 rounded-lg"
                    )}
                    key={item._id}
                >
                    <div className="w-32 h-20 flex items-center flex-shrink-0">
                        <img
                            src={item?.image?.src ?? dummyImageUrl}
                            alt={item?.title}
                            className="aspect-video object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="text-base 2xl:text-title-lg font-bold line-clamp-2">
                            {item?.title ?? ""}
                        </h2>
                        <p className="text-gray-500 text-base 2xl:text-title-lg">{formatDate(item?.createdAt)}</p>
                    </div>
                </Link>
            ))}
        </div>

    )
}
