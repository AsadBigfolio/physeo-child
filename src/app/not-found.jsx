import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md px-4 py-8 text-center bg-white rounded-lg shadow-md">
                <h1 className="text-6xl font-bold text-[#491a8b]">404</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    It may have been moved or the URL may be incorrect.
                </p>
                <Link href="/">
                    <p className="inline-block px-6 py-3 mt-6 text-white bg-[#491a8b] rounded-lg shadow-lg hover:bg-opacity-90 transition duration-300">
                        Go Back Home
                    </p>
                </Link>
            </div>
        </div>
    );
}
