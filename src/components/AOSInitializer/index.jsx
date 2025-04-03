'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AOSInitializer = () => {
    useEffect(() => {
        AOS.init({
            duration: 800, // animation duration in milliseconds
            easing: 'ease-in-out', // default easing for AOS animations
            once: true, // whether animation should happen only once
        });
    }, []);

    return null;
};

export default AOSInitializer;