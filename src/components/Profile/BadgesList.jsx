import React from 'react'

export default function BadgesList({ badges }) {
    const dummyImageUrl = 'https://via.placeholder.com/130x130'

    const borderStyleDecider = (index) => {
        let borderClass = ''
        if (index == 0) {
            borderClass = 'rounded-t-[10px]'
        }
        if (badges.length - 1 === index) {
            borderClass = 'rounded-b-[10px] border-b'
        }
        return borderClass
    }

    return (
        <div>
            {badges.map((badge, index) => (
                <div
                    key={badge.name}
                    className={`flex items-center  p-4 space-x-4 relative w-full ${borderStyleDecider(index)} p-4 border-l border-r border-t border-[#00000040]`}
                >
                    <img
                        src={badge?.image?.src || dummyImageUrl}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = dummyImageUrl;
                        }}
                        alt={badge.name}
                        className={`sm:size-[130px] size-[90px] object-cover rounded-full`}
                    />

                    <div className="flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800">{badge.title}</h2>
                        <p className="text-sm text-gray-500">{badge?.description}</p>
                    </div>

                </div>
            ))}
        </div>
    );
}
