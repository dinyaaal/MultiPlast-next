"use client";

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { ProductCard } from "./ProductCard";
import { MinimalProduct } from "@/types/types";
import { ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

interface AdvertsSwiperProps {
  adverts: MinimalProduct[];
}

export default function AdvertsSwiper({ adverts }: AdvertsSwiperProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const updateButtonsVisibility = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    const hidden = swiper.isBeginning && swiper.isEnd;
    if (prevRef.current) prevRef.current.style.display = hidden ? "none" : "";
    if (nextRef.current) nextRef.current.style.display = hidden ? "none" : "";
  };

  useEffect(() => {
    updateButtonsVisibility();
  }, []);

  return (
    <div className="adverts__body">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        className="adverts__slider"
        modules={[Pagination, Navigation]}
        navigation={{
          prevEl: ".adverts-arrow-prev",
          nextEl: ".adverts-arrow-next",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onBreakpoint={updateButtonsVisibility}
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
