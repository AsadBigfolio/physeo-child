import Link from 'next/link'

export const UnPaidContent = () => {
    return (
        <div className="flex flex-col justify-center items-center w-[910px] h-[514px] text-center space-y-6 ">
            <h1 className="text-3xl font-bold text-gray-800">
                You don&apos;t have access to this course
            </h1>
            <p className="text-gray-600">
                Purchase this course to unlock all the content and start learning
                today.
            </p>
            <Link
                href={"/#plan"}
                scroll={true}
                className="px-6 py-3 bg-primary text-white rounded-xl  transition-all duration-300"
            >
                Buy Now
            </Link>
        </div>
    )
}