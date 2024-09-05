"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import { Pagination } from "swiper/modules";

export default function HeroSwiper() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      className="body-hero__slider"
      modules={[Pagination]}
      pagination={{ clickable: true }}
      breakpoints={{
        479.98: {
          slidesPerView: 2,
        },
        767.98: {
          slidesPerView: 3,
        },
        991.98: {
          slidesPerView: 4,
          enabled: false,
          pagination: false,
        },
      }}
    >
      <SwiperSlide>
        <Image
          src="/hero/items/01.jpg"
          alt="Image"
          width={1000}
          height={1000}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/hero/items/02.jpg"
          alt="Image"
          width={1000}
          height={1000}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/hero/items/03.jpg"
          alt="Image"
          width={1000}
          height={1000}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/hero/items/04.jpg"
          alt="Image"
          width={1000}
          height={1000}
        />
      </SwiperSlide>
    </Swiper>
    // <div className="body-hero__slider swiper">
    //   <div className="body-hero__wrapper swiper-wrapper">
    //     <div className="body-hero__slide swiper-slide">

    //     </div>
    //     <div className="body-hero__slide swiper-slide">
    //       <Image
    //         src="/hero/items/02.jpg"
    //         alt="Image"
    //         width={100}
    //         height={100}
    //       />
    //     </div>
    //     <div className="body-hero__slide swiper-slide">
    //       <Image
    //         src="/hero/items/03.jpg"
    //         alt="Image"
    //         width={100}
    //         height={100}
    //       />
    //     </div>
    //     <div className="body-hero__slide swiper-slide">
    //       <Image
    //         src="/hero/items/04.jpg"
    //         alt="Image"
    //         width={100}
    //         height={100}
    //       />
    //     </div>
    //   </div>
    //   <div className="body-hero__pagination swiper-pagination"></div>
    // </div>
  );
}
