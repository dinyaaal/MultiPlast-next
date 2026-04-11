"use client";

import React, { useRef } from "react";
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
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="adverts__body">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        className="adverts__slider"
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation === "object") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          375: {
            slidesPerView: "auto",
          },
          640: {
            slidesPerView: 2,
          },
          768: {
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
        ref={prevRef}
        type="button"
        className="swiper-button swiper-button-prev adverts-arrow-prev"
      >
        <ChevronRight />
      </button>
      <button
        ref={nextRef}
        type="button"
        className="swiper-button swiper-button-next adverts-arrow-next"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
