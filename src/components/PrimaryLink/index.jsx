import React from 'react';
import Link from 'next/link';

const PrimaryLink = ({
    title,
    href,
    className = '',
    isBlock = false
}) => {
    const buttonClasses = `bg-[#007DFC] text-white ${isBlock ? "flex" : "inline-block"} justify-center text-[14px] px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-600 transition ${className}`
    return (
        <Link href={href} className={buttonClasses}>
            {title}
        </Link>
    );
};

export default PrimaryLink;