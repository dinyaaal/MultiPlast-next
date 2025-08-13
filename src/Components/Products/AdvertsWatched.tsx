"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { MinimalProduct } from "@/types/types";
import { getRecentProducts } from "@/utils/getRecentProducts";
import { ProductCard } from "./components/ProductCard";
import { ChevronRight } from "lucide-react";
// import ProductCard from "./components/ProductCard";

export default function AdvertsWatched() {
  const [recent, setRecent] = useState<MinimalProduct[]>([]);

  useEffect(() => {
    const data = getRecentProducts();
    setRecent(data);
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="adverts">
      <div className="adverts__container">
        <div className="adverts__top">
          <h2 className="adverts__title title">Нещодавно переглянуті</h2>
          {/* <a href="#" className="adverts__button button">
            Подати оголошення
          </a> */}
        </div>
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
            {recent.map((product) => (
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
        {/* <a href="#" className="adverts__button adverts__button--mobile button">
          Подати оголошення
        </a> */}
      </div>
    </section>
  );
}
