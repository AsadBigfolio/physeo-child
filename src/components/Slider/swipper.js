'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

export default function Slider({ children, swiperRef, sliderClass, defaultSlides }) {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                // spaceBetween={20}
                slidesPerView={1}
                freeMode={true}
                grabCursor={true}
                loop={true}
                breakpoints={{
                    340: { slidesPerView: 1.8 },
                    480: { slidesPerView: 3 },
                    640: { slidesPerView: defaultSlides ?? 4 },
                    768: { slidesPerView: 5 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {children.map((child, index) => (
                    <SwiperSlide className={sliderClass} key={index}>{child}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
