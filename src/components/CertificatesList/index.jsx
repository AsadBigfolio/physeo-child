"use client"
import UserContext from '@/context/user';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

export default function CertificatesList() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const courses = [
        { name: 'Conspiracy', src: '/certificate/Conspiracy.jpg' },
        { name: 'Cryptozoology', src: '/certificate/Cryptozoology.jpg' },
        { name: 'Magicology', src: '/certificate/Magicology.jpg' },
        { name: 'Paranormal', src: '/certificate/Paranormal.jpg' },
        { name: 'Phenomenology', src: '/certificate/Phenomenology.jpg' },
        { name: 'Ufology', src: '/certificate/Ufology.jpg' },
        { name: 'Unexplained', src: '/certificate/Unexplained.jpg' },
    ];

    const isUserCertificate = (certificateName) => {
        return user?.certificates?.includes(certificateName);
    };

    const handleCertificateRedirect = (certificateName) => {
        router.push(`/certificate/${certificateName}`);
    };
    const borderStyleDecider = (index) => {
        let borderClass = ''
        if (index == 0) {
            borderClass = 'rounded-t-[10px]'
        }
        if (courses.length - 1 === index) {
            borderClass = 'rounded-b-[10px] border-b'
        }
        return borderClass
    }

    return (
        <>
            {courses.map((certificate, index) => (
                <div
                    key={certificate.name}
                    className={`flex items-center  p-4 space-x-4 relative w-full ${borderStyleDecider(index)} p-4 border-l border-r border-t border-[#00000040]`}
                >
                    <img
                        src={certificate.src}
                        alt={certificate.name}
                        className={`w-32 h-24 object-cover rounded-md `}
                    />
                    <div className='flex-1 flex items-start sm:items-center justify-between sm:gap-5 gap-2 sm:flex-row flex-col'>
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold text-gray-800">{certificate.name}</h2>
                            <p className="text-sm text-gray-500">{certificate.name.slice(0, 4).toUpperCase()}</p>
                        </div>
                        <button
                            disabled={!isUserCertificate(certificate.name)}
                            onClick={() => handleCertificateRedirect(certificate.name)}
                            className={`flex items-center border-2 justify-center text-[20px] border-[#491A8B] text-primary px-4 py-1 rounded-[100px] hover:bg-purple-50 transition ${!isUserCertificate(certificate.name) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M16 5H4V3a2 2 0 012-2h8a2 2 0 012 2v2zM4 6h12a2 2 0 012 2v4h-2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3H2V8a2 2 0 012-2zM6 14v3h8v-3H6z" />
                            </svg>
                            Print
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
