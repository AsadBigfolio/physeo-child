import React from "react";

const MediaUniverse = () => {
    const items = [
        {
            id: 1,
            image: "/media-universe/1st.png",
            title: "ALI3NS Trading Card Game",
        },
        {
            id: 2,
            image: "/media-universe/2nd.png",
            title: "SUPERNATURAL-CON",
        },
        {
            id: 3,
            image: "/media-universe/3rd.png",
            title: "ALI3NS",
        },
    ];

    return (
        <div className="py-10" id='media-universe'>
            <h2 className="text-center text-heading-xl font-bold text-black">
                Media <span className="text-purple-600">Universe</span>
            </h2>
            <div className="mt-8 flex justify-center gap-6">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-[400px] h-[114px] rounded-lg overflow-hidden shadow-md transition-all"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaUniverse;
