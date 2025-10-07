"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";

export default function HeroSwiper() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      className="body-hero__slider"
      modules={[Pagination]}
      pagination={{ enabled: true, clickable: true }}
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
  );
}
