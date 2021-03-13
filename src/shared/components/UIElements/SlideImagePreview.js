import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/components/navigation/navigation.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import "./SlideImagePreview.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const SlideImagePreview = (props) => {
    const { images, setPreviewImg } = props;


    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            style={{width: "90%"}}
        >
            {images.map((slide, index) => (
                <SwiperSlide className="slide-img" key={index} onClick={() => setPreviewImg(slide)} style={{padding: 0}}  >
                    <img src={slide} alt={index} />
                </SwiperSlide>
            ))}
        </Swiper>
    )

}