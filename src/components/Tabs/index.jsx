'use client';
import React, { useState, useContext, Suspense } from 'react';
import dynamic from 'next/dynamic';
import UserContext from '@/context/user';

// Lazy-loaded components with suspense enabled
const WatchHistory = dynamic(() => import('../Profile/WatchHistory'), { suspense: true });
const WatchLater = dynamic(() => import('../Profile/WatchLater'), { suspense: true });
const BadgesList = dynamic(() => import('../Profile/BadgesList'), { suspense: true });
const ReferralDetail = dynamic(() => import('../RefarralDetails'), { suspense: true });
const CertificatesList = dynamic(() => import('../CertificatesList'), { suspense: true });

// Loader Component with Tailwind CSS Spinner
const Loader = () => (
    <div className="flex justify-center items-center h-[200px]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const TabComponent = ({ badges }) => {
    const [activeTab, setActiveTab] = useState('watchHistory');
    const user = useContext(UserContext);

    const tabs = [
        { name: 'History', id: 'watchHistory', comp: <WatchHistory /> },
        { name: 'Favorites', id: 'favorites', comp: <WatchLater /> },
        { name: 'Badges', id: 'badgeCollection', comp: <BadgesList badges={badges} /> },
        { name: 'Certificates', id: 'certificates', comp: <CertificatesList /> },
        ...(user?.user?.role === "influencer"
            ? [{ name: 'Referral Details', id: 'refDetail', comp: <ReferralDetail /> }]
            : []
        )
    ];

    return (
        <>
            <div className="flex justify-center">
                <div className="bg-[#A197EC52] w-[850px] rounded-[10px] p-2 md:p-5">
                    <div className="flex gap-[10px]">
                        {tabs.map((tab) => (
                            <div key={tab.id} className="flex-1">
                                <h1
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`cursor-pointer text-center sm:px-0 px-2 sm:h-[44px] h-[38px] flex items-center justify-center rounded-[10px] text-[14px] sm:text-[16px] md:text-[20px] font-medium transition-all duration-300
                                    ${activeTab === tab.id
                                            ? 'bg-[#491a8b] text-white'
                                        : 'text-[#491a8b] hover:bg-[#491a8b]/10'
                                        }`}
                                >
                                    {tab.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Suspense Fallback Loader */}
            <Suspense fallback={<Loader color='black' />}>
                <div className='flex justify-center'>
                    <div className='w-[1100px] my-[30px]'>
                        {tabs.find((item) => item.id === activeTab).comp}
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default TabComponent;
