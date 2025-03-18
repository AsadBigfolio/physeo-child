"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "@/context/user";
import Button from "../UI/Button";
import Image from "next/image";

const Certificate = (props) => {
    const { course } = props;
    const { user } = useContext(UserContext);
    const { firstName, lastName } = user || {};
    const [fontSize, setFontSize] = useState(45);
    const imageRef = useRef(null);
    const certificateRef = useRef(null);
    const headingRef = useRef(null);

    const courses = [
        { name: "Conspiracy", src: "/certificate/Conspiracy.jpg", color: '#7fad89' },
        { name: "Cryptozoology", src: "/certificate/Cryptozoology.jpg", color: '#dab88f' },
        { name: "Magicology", src: "/certificate/Magicology.jpg", color: '#1b4f9b' },
        { name: "Paranormal", src: "/certificate/Paranormal.jpg", color: '#82d8f3' },
        { name: "Phenomenology", src: "/certificate/Phenomenology.jpg", color: '#a32620' },
        { name: "Ufology", src: "/certificate/Ufology.jpg", color: '#b5a0c7' },
        { name: "Unexplained", src: "/certificate/Unexplained.jpg", color: '#86338b' },
    ];

    const courseIndex = courses.findIndex((item) => item.name.toLowerCase() === course.toLowerCase());

    useEffect(() => {
        const updateFontSize = () => {
            if (imageRef.current) {
                const imageWidth = imageRef.current.clientWidth;
                const imageHeight = imageRef.current.clientHeight;
                const newSize = Math.max(20, Math.min(imageWidth, imageHeight) / 12);
                setFontSize(newSize);
            }
        };

        updateFontSize();
        const observer = new ResizeObserver(updateFontSize);
        if (imageRef.current) observer.observe(imageRef.current);

        window.addEventListener("resize", updateFontSize);
        return () => {
            window.removeEventListener("resize", updateFontSize);
            observer.disconnect();
        };
    }, [courses, courseIndex]);

    const downloadImage = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new window.Image();
        image.crossOrigin = "anonymous";
        image.src = courses[courseIndex]?.src || "";

        image.onload = () => { 
            canvas.width = 3300;
            canvas.height = 2550;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            const fontSize = 45 * 5;
            const marginTop = 50;

            ctx.font = `${fontSize}px Avalen`;
            ctx.fillStyle = courses[courseIndex]?.color || "black";
            ctx.textAlign = "center";
            ctx.fillText(`${firstName} ${lastName}`, canvas.width / 2, canvas.height / 2 + marginTop);

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/jpeg", 1.0);
            link.download = `${courses[courseIndex]?.name}_certificate.jpg`;
            link.click();
        };
    };

    if (
        !user?.certificates?.some((item) => item.toLowerCase() === course.toLowerCase()) ||
        courseIndex === -1
    ) {
        return <h1 className="text-center text-xl py-10">You are not eligible to get this certificate.</h1>;
    }

    return (
        <div className="md:px-5 lg:px-0 md:flex md:flex-col md:items-center md:justify-center min-h-screen bg-gray-100 p-4 w-full">
            <div ref={certificateRef} className="relative w-full max-w-[1024px] h-auto flex justify-center items-center overflow-hidden">
                <div className="relative w-full h-auto">
                    <Image
                        ref={imageRef}
                        src={courses[courseIndex]?.src || ""}
                        alt="Certificate Background"
                        layout="responsive"
                        width={1024}
                        height={768}
                        className="object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 ref={headingRef} className={`font-[Avalen] text-center`} style={{ fontSize: `${fontSize}px`, color: courses[courseIndex]?.color || 'black' }}>
                            {firstName} {lastName}
                        </h2>
                    </div>
                </div>
            </div>
            <Button onClick={downloadImage} className="mt-4">
                Download
            </Button>
        </div>
    );
};

export default Certificate;
