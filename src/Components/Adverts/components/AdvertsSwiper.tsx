"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";

export default function AdvertsSwiper() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      className="adverts__slider"
      modules={[Navigation]}
      navigation
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
      <SwiperSlide>
        <a href="#" className="adverts__item item-advert">
          <div className="item-advert__image">
            <Image
              src="/advert/01.jpg"
              alt="Image"
              width={1000}
              height={1000}
            />
          </div>
          <div className="item-advert__body">
            <div className="item-advert__content">
              <div className="item-advert__name">Полікарбонат</div>
              <div className="item-advert__value">125г</div>
            </div>
            <div className="item-advert__bottom">
              <div className="item-advert__price">
                <span>35</span> грн
              </div>
              <button className="item-advert__like like">
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5964 20.0475L10.5957 20.0469C7.49587 17.2385 4.96312 14.9402 3.19949 12.7845C1.44134 10.6355 0.5 8.68942 0.5 6.59401C0.5 3.16654 3.17912 0.5 6.6 0.5C8.53702 0.5 10.4043 1.40349 11.6207 2.81954L12 3.26105L12.3793 2.81954C13.5957 1.40349 15.463 0.5 17.4 0.5C20.8209 0.5 23.5 3.16654 23.5 6.59401C23.5 8.68942 22.5587 10.6355 20.8005 12.7845C19.0369 14.9402 16.5041 17.2385 13.4043 20.0469L13.4036 20.0475L12 21.3241L10.5964 20.0475Z"
                    fill="white"
                    stroke="#BA360C"
                  />
                </svg>
              </button>
            </div>
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="#" className="adverts__item item-advert">
          <div className="item-advert__image">
            <Image
              src="/advert/01.jpg"
              alt="Image"
              width={1000}
              height={1000}
            />
          </div>
          <div className="item-advert__body">
            <div className="item-advert__content">
              <div className="item-advert__name">Полікарбонат</div>
              <div className="item-advert__value">125г</div>
            </div>
            <div className="item-advert__bottom">
              <div className="item-advert__price">
                <span>35</span> грн
              </div>
              <button className="item-advert__like like">
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5964 20.0475L10.5957 20.0469C7.49587 17.2385 4.96312 14.9402 3.19949 12.7845C1.44134 10.6355 0.5 8.68942 0.5 6.59401C0.5 3.16654 3.17912 0.5 6.6 0.5C8.53702 0.5 10.4043 1.40349 11.6207 2.81954L12 3.26105L12.3793 2.81954C13.5957 1.40349 15.463 0.5 17.4 0.5C20.8209 0.5 23.5 3.16654 23.5 6.59401C23.5 8.68942 22.5587 10.6355 20.8005 12.7845C19.0369 14.9402 16.5041 17.2385 13.4043 20.0469L13.4036 20.0475L12 21.3241L10.5964 20.0475Z"
                    fill="white"
                    stroke="#BA360C"
                  />
                </svg>
              </button>
            </div>
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="#" className="adverts__item item-advert">
          <div className="item-advert__image">
            <Image
              src="/advert/01.jpg"
              alt="Image"
              width={1000}
              height={1000}
            />
          </div>
          <div className="item-advert__body">
            <div className="item-advert__content">
              <div className="item-advert__name">Полікарбонат</div>
              <div className="item-advert__value">125г</div>
            </div>
            <div className="item-advert__bottom">
              <div className="item-advert__price">
                <span>35</span> грн
              </div>
              <button className="item-advert__like like">
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5964 20.0475L10.5957 20.0469C7.49587 17.2385 4.96312 14.9402 3.19949 12.7845C1.44134 10.6355 0.5 8.68942 0.5 6.59401C0.5 3.16654 3.17912 0.5 6.6 0.5C8.53702 0.5 10.4043 1.40349 11.6207 2.81954L12 3.26105L12.3793 2.81954C13.5957 1.40349 15.463 0.5 17.4 0.5C20.8209 0.5 23.5 3.16654 23.5 6.59401C23.5 8.68942 22.5587 10.6355 20.8005 12.7845C19.0369 14.9402 16.5041 17.2385 13.4043 20.0469L13.4036 20.0475L12 21.3241L10.5964 20.0475Z"
                    fill="white"
                    stroke="#BA360C"
                  />
                </svg>
              </button>
            </div>
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="#" className="adverts__item item-advert">
          <div className="item-advert__image">
            <Image
              src="/advert/01.jpg"
              alt="Image"
              width={1000}
              height={1000}
            />
          </div>
          <div className="item-advert__body">
            <div className="item-advert__content">
              <div className="item-advert__name">Полікарбонат</div>
              <div className="item-advert__value">125г</div>
            </div>
            <div className="item-advert__bottom">
              <div className="item-advert__price">
                <span>35</span> грн
              </div>
              <button className="item-advert__like like">
                <svg
                  width="24"
                  height="22"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5964 20.0475L10.5957 20.0469C7.49587 17.2385 4.96312 14.9402 3.19949 12.7845C1.44134 10.6355 0.5 8.68942 0.5 6.59401C0.5 3.16654 3.17912 0.5 6.6 0.5C8.53702 0.5 10.4043 1.40349 11.6207 2.81954L12 3.26105L12.3793 2.81954C13.5957 1.40349 15.463 0.5 17.4 0.5C20.8209 0.5 23.5 3.16654 23.5 6.59401C23.5 8.68942 22.5587 10.6355 20.8005 12.7845C19.0369 14.9402 16.5041 17.2385 13.4043 20.0469L13.4036 20.0475L12 21.3241L10.5964 20.0475Z"
                    fill="white"
                    stroke="#BA360C"
                  />
                </svg>
              </button>
            </div>
          </div>
        </a>
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
