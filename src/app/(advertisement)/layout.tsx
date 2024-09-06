"use client";

import Select from "@/Components/Select/Select";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import AdvertismentTab from "@/Components/Advertisment/AdvertismentTab";

export default function AdvertismentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="advertisement">
        <div className="advertisement__container">
          <div className="tabs-advertisement">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              modules={[Navigation]}
              className=""
              navigation={{
                nextEl: ".swiper-arrow-next",
                prevEl: ".swiper-arrow-prev",
              }}
              breakpoints={{
                991.98: {
                  slidesPerView: "auto",
                  enabled: false,
                },
              }}
            >
              <SwiperSlide>
                <div className="tabs-advertisement__title">
                  Подати оголошення
                </div>
                <Select
                  options={[
                    { value: "sell", label: "Про продаж" },
                    { value: "buy", label: "Про купівлю" },
                  ]}
                />

                <div className="tabs-advertisement__items">
                  <AdvertismentTab href="/sell" text="Про продаж" />
                  <AdvertismentTab href="/buy" text="Про купівлю" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="tabs-advertisement__title">Мої оголошення</div>
                <Select
                  options={[
                    { value: "my-sell", label: "Мої оголошення про продаж" },
                    { value: "my-buy", label: "Мої оголошення про купівлю" },
                  ]}
                />

                <div className="tabs-advertisement__items">
                  <AdvertismentTab
                    href="/my-sell"
                    text="Мої оголошення про продаж"
                  />
                  <AdvertismentTab
                    href="/my-sell"
                    text="Мої оголошення про купівлю"
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="tabs-advertisement__title">
                  Особистий кабінет
                </div>

                <div className="tabs-advertisement__items">
                  <AdvertismentTab
                    href="/profile"
                    text="Редагувати контактні данні"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <button type="button" className="swiper-arrow swiper-arrow-prev">
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989592 6.3033 0.696698C6.01041 0.403805 5.53553 0.403805 5.24264 0.696698L0.46967 5.46967ZM15 5.25L1 5.25L1 6.75L15 6.75L15 5.25Z"
                  fill="#1858B8"
                />
              </svg>
            </button>
            <button type="button" className="swiper-arrow swiper-arrow-next">
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989592 6.3033 0.696698C6.01041 0.403805 5.53553 0.403805 5.24264 0.696698L0.46967 5.46967ZM15 5.25L1 5.25L1 6.75L15 6.75L15 5.25Z"
                  fill="#1858B8"
                />
              </svg>
            </button>
          </div>

          <div className="advertisement__block">{children}</div>
        </div>
      </section>
    </>
  );
}
