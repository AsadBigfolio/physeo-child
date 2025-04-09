'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import dynamic from 'next/dynamic';
import { FaSearch, FaTimes } from 'react-icons/fa';

const VideoList = dynamic(() => import('../VideoList'), {
    loading: () => <p className='text-center py-4 text-gray-500'>Loading videos...</p>,
    ssr: false,
});

const BlogList = dynamic(() => import('../BlogList'), {
    loading: () => <p className='text-center py-4 text-gray-500'>Loading blogs...</p>,
    ssr: false,
});

const Drawer = ({ open, setOpen }) => {
    const [selectedTab, setSelectedTab] = useState('Videos');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

    const tabs = ['Videos', 'Blogs'];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'Blogs':
                return <BlogList searchTerm={debouncedSearchTerm} />;
            case 'Products':
                return <p className='text-center py-8 text-gray-500'>Products coming soon.</p>;
            case 'Videos':
            default:
                return <VideoList searchTerm={debouncedSearchTerm} />;
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-[150] transition-all duration-300 ease-out ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setOpen(false)}
                ></div>

                <div
                    className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-white pt-4 pb-4 flex flex-col shadow-xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex items-center justify-between px-6 py-2 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800">Search Content</h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <FaTimes className="text-gray-500 hover:text-gray-700" />
                        </button>
                    </div>

                    <div className="px-6 py-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search videos, blogs..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007DFC] focus:border-transparent transition-all"
                                autoFocus
                            />
                            <FaSearch className="absolute left-3 top-4 text-gray-400" />
                        </div>
                    </div>

                    <nav className="flex gap-1 px-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`px-4 py-2 rounded-md transition-all duration-200 ease-in-out font-medium text-sm ${selectedTab === tab
                                    ? 'text-[#007DFC] bg-blue-50'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        {renderContent()}
                    </div>

                    <div className="px-6 py-3 border-t border-gray-100 text-center text-xs text-gray-500">
                        Press ESC to close
                    </div>
                </div>
            </div>
        </>
    );
};

export default Drawer;