"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const CountdownBanner = () => {
    const discountTime = "2025-05-01T00:00:00Z"
    const [timeLeft, setTimeLeft] = useState(null);
    const [showBanner, setShowBanner] = useState(true);

    useEffect(() => {
        const deadline = new Date(discountTime).getTime();
        const now = new Date().getTime();
        const diffInSeconds = Math.floor((deadline - now) / 1000);
        setTimeLeft(diffInSeconds > 0 ? diffInSeconds : 0);
    }, []);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => (prev ? prev - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${hours} : ${minutes} : ${sec}`;
    };

    if (!showBanner || timeLeft === null) return null;

    return (
        <div className="w-full bg-[#FBBB30] text-mainText h-[39px] px-5 flex justify-between items-center  transition-transform duration-500 ease-in-out">
            <div></div>
            <div className="flex items-center gap-4">
                <span className="text-[16px] font-semibold flex gap-1"><img src='/new/vector.svg' alt='physeo' /> Enrol In Any Course Get 20% Discount</span>
                <span className="bg-[#FFFFFF57] text-black px-[8px] h-[23px] rounded-[4px] text-[16px] font-semibold animate-pulse">
                    {formatTime(timeLeft)}
                </span>
                <Link href='/signup' className="bg-white px-[12px] h-[27px] rounded-full flex items-center text-[14px] font-semibold hover:bg-gray-200 transition">
                    Enrol now
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <button onClick={() => setShowBanner(false)} className=" hover:text-gray-700 font-semibold">
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default CountdownBanner;
