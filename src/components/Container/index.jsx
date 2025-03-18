"use client"
import { cn } from '@/utils/classNames';
import React, { useEffect, useState } from 'react';

const Container = ({ children, className, variant = 'default', ...props }) => {
    const [dynamicMaxWidth, setDynamicMaxWidth] = useState(null);

    const updateMaxWidth = () => {
        const containerElement = document.querySelector('.container-dynamic');

        if (variant === 'full') {
            setDynamicMaxWidth('100%');
        } else if (variant !== 'default' && containerElement) {
            const containerRect = containerElement.getBoundingClientRect();
            const leftSpace = containerRect.left;
            const rightSpace = window.innerWidth - containerRect.right - 14;
            const additionalSpace = variant === 'right-less' ? leftSpace - 20 : rightSpace;
            setDynamicMaxWidth(`calc(${containerElement.offsetWidth}px + ${additionalSpace}px)`);
        }
    };

    useEffect(() => {
        updateMaxWidth();
        window.addEventListener('resize', updateMaxWidth);

        return () => {
            window.removeEventListener('resize', updateMaxWidth);
        };
    }, [variant]);

    return (
        <div
            {...props}
            className={cn(
                'container-dynamic !ml-auto lg:pr-5 max-lg:pl-[14px] max-lg:pr-[14px]',
                className,
                {
                    '!pr-0 !mr-0': variant === 'right-less',
                    '!pl-0 !ml-0': variant === 'left-less',
                }
            )}
            style={dynamicMaxWidth ? { maxWidth: dynamicMaxWidth } : {}}
        >
            {children}
        </div>
    );
};

export default Container;