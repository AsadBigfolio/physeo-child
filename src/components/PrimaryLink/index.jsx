import React from 'react';
import Link from 'next/link';

const PrimaryLink = ({
    title,
    href,
    className = '',
}) => {
    const buttonClasses = `bg-[#007DFC] text-white flex w-fit justify-center items-center text-[14px] px-[20px] py-[12px] h-[40px] rounded-full font-semibold shadow-lg hover:bg-blue-600 transition ${className}`
    return (
        <Link href={href} className={buttonClasses}>
            {title}
        </Link>
    );
};

export default PrimaryLink;