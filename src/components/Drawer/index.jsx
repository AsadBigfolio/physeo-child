'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import dynamic from 'next/dynamic';
import SearchIcon from "../../svgs/SearchIcon.js";

const VideoList = dynamic(() => import('../VideoList'), {
    loading: () => <p className='text-center'>Loading...</p>,
    ssr: false,
});

const BlogList = dynamic(() => import('../BlogList'), {
    loading: () => <p className='text-center'>Loading...</p>,
    ssr: false,
});

const Drawer = () => {
    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Videos');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300); // Debounce with 300ms delay

    const tabs = ['Videos', 'Blogs'];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'Blogs':
                return <BlogList searchTerm={debouncedSearchTerm} />;
            case 'Products':
                return <p className='text-center'>Products not found.</p>;
            case 'Videos':
            default:
                return <VideoList searchTerm={debouncedSearchTerm} />;
        }
    };

    return (
        <>
            <span onClick={() => setOpen(true)} className="text-para-base cursor-pointer">
                <SearchIcon />
            </span>
            <div
                className={`fixed inset-0 z-[150] transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setOpen(false)}
                ></div>
                <div
                    className={`absolute right-0 top-0 h-full w-[80%] sm:w-[40%] bg-white pt-6 pb-4 flex flex-col shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex items-center px-4 md:px-6">
                        <input
                            type="text"
                            placeholder="Search here"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 mb-4 border-b border-[#220022CC] focus:outline-none focus:border-b-2 focus:border-[#220022]"
                        />
                    </div>
                    <nav className="flex sm:gap-4 mb-4 px-4 md:px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`px-4 py-2 transition-all duration-300 ease-in-out ${selectedTab === tab
                                    ? 'text-[#491A8B] border-b-2 border-black'
                                    : 'text-gray-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                    <div className="px-4 md:px-6 flex-1 overflow-y-auto">{renderContent()}</div>
                </div>
            </div>
        </>
    );
};

export default Drawer;
