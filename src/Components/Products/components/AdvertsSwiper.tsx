"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "./ProductCard";
import { MinimalProduct } from "@/types/types";
import { ChevronRight } from "lucide-react";

interface AdvertsSwiperProps {
  adverts: MinimalProduct[];
}

export default function AdvertsSwiper({ adverts }: AdvertsSwiperProps) {
  return (
    <div className="adverts__body">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        className="adverts__slider"
        modules={[Pagination, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          375: {
            slidesPerView: "auto",
          },
          991.98: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {adverts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        className="swiper-button swiper-button-prev adverts-arrow-prev"
      >
        <ChevronRight />
      </button>
      <button
        type="button"
        className="swiper-button swiper-button-next adverts-arrow-next"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
